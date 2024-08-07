import {
  UpdateTemplateCommand,
  CreateTemplateCommand,
  ListTemplatesCommand,
  SESClient,
  UpdateTemplateCommandInput,
  CreateTemplateCommandInput,
} from "@aws-sdk/client-ses";

const client = new SESClient();

export const ses = {
  update: async (params: UpdateTemplateCommandInput) => {
    const command = new UpdateTemplateCommand(params);
    return await client.send(command);
  },
  create: async (params: CreateTemplateCommandInput) => {
    const command = new CreateTemplateCommand(params);
    return await client.send(command);
  },
  list: async () => {
    const command = new ListTemplatesCommand();
    return await client.send(command);
  },
};
