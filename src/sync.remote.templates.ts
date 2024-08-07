import { ses } from "./aws.ses.api.js";

interface LocalTemplate {
  name: string;
  subject: string;
  text: string;
  html: string;
}

export async function syncRemoteTemplate(
  local: LocalTemplate,
  remoteTemplateNames: string[]
) {
  if (remoteTemplateNames.includes(local.name)) {
    console.log("updating template", local.name);
    await ses.update({
      Template: {
        TemplateName: local.name,
        HtmlPart: local.html,
        SubjectPart: local.subject,
        TextPart: local.text,
      },
    });
  } else {
    console.log("creating template", local.name);
    await ses.create({
      Template: {
        TemplateName: local.name,
        HtmlPart: local.html,
        SubjectPart: local.subject,
        TextPart: local.text,
      },
    });
  }
}

export async function syncRemoteTemplates(locals: LocalTemplate[]) {
  const remoteTemplates: string[] =
    (await ses.list()).TemplatesMetadata?.map((t) => t.Name ?? "") ?? [];

  console.log("remote templates", remoteTemplates);

  return Promise.all(
    locals.map((local) => syncRemoteTemplate(local, remoteTemplates))
  );
}
