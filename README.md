# Typesafe Amazon SES Templates

This package allows you to define AWS SES templates within your codebase and use them in a typesafe way.

## Usage

```bash
npx typesafe-amazon-ses-templates --template-folder ./path/to/templates --out-file ./path/to/output/email.template.interfaces.ts
```

### Options

- `--template-folder` - The folder where your SES templates are stored
- `--out-file` - The file where the generated types will be written to
- `--interface-prefix` - The prefix for the generated interfaces, default "SES"
- `--interface-suffix` - The suffix for the generated interfaces, default "Template"

### Behaviour

- The tool will generate a typescript file containing an interface for each template.
- The tool will create a remote SES template for each template in the folder if it does not already exist.
- The tool will update the remote SES template if it matches a local template folder name.

This tool will never delete any remote SES templates.

### Output

The generated file will contain an interface for each template in the folder.
It will also generate a union you can discriminate against, eg:

```typescript
export type AwsSesTemplatedEmail =
  | {
      _templateName: "template1";
      subject: string;
      person: { name: string; email: string };
    }
  | {
      _templateName: "template2";
      subject: string;
      product: { id: string; name: string };
    };
```

## Folder Structure

Within the template folder, you should have a folder for each template. The folder name will be used as the template name.

Each folder should contain three templates:

- `subject.txt` - The subject of the email
- `text.txt` - The text version of the email
- `html.html` - The HTML version of the email
