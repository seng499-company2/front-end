# front-end

This is the front-end of the application.

## How to use

### Install

To install the dependencies, run the following command in the root directory of the project:

```bash
npm ci
```

### Production Build

To generate the production build, run the following command in the root directory of the project:

```bash
npm run build
```

### Development

Ensure the dependencies are installed.

```bash
npm ci
```

Copy the example local environment variables to `.env.local` so they can be used by NextJS. Modify the variables as necessary. The NextJS server must be restarted to use any changed environment variables. 

```bash
cp .example.env.local .env.local
```

Run the following command to start the development server:

```bash
npm run dev
```

And you're done! See the app running at [http://localhost:3000](http://localhost:3000).

To lint the code, run the following command:

```bash
npm run lint
```

This also checks for `prettier` formatting. To explicitly format the code with `prettier`, run the following command:

```bash
npm run format
```

It's recommended to enable the `prettier` plugin in VS Code to automatically format the code when you save it. See [this page](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or [this one](https://www.digitalocean.com/community/tutorials/code-formatting-with-prettier-in-visual-studio-code) for more information.

## Notes

Node.js is required (includes npm). You can download it here: [https://nodejs.org/en/download/](https://nodejs.org/en/download/). LTS will work.

### Stack

This project uses [Next.JS](https://nextjs.org/docs/getting-started) (with [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [chakra-ui](https://chakra-ui.com/guides/first-steps)).

Here's a decent tutorial for learning React: [https://www.taniarascia.com/getting-started-with-react/](https://www.taniarascia.com/getting-started-with-react/).

And here's a React "cheatsheet": [https://www.freecodecamp.org/news/the-react-cheatsheet/](https://www.freecodecamp.org/news/the-react-cheatsheet/).

### Other useful links for development

You will also find these in the relevant files in the demo branch.

-   https://chakra-ui.com/docs/styled-system/theming/customize-theme
-   https://nextjs.org/docs/basic-features/pages
-   https://nextjs.org/docs/basic-features/layouts
-   https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
-   https://nextjs.org/docs/routing/dynamic-routes
