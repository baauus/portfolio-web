# Baus portfolio (rbaus.dev)

Installation guide for this portfolio web.

## Requirements

- Node.js (version 18 or higher)
- pnpm (version 8 or higher)

## Installation

**Local installation**:

1. Clone this repository:

   ```bash
   git clone git@github.com:baauus/portfolio-web.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio-web
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm run dev
   ```

5. Create .env File (If you want)

   ```

7. Open your browser and visit `http://localhost:4312` to see your portfolio in action.

8. Config your site
   1. Edit `src/content/profileData.ts` to add your profile data
   2. Edit `astro.config.mjs` to change the site information

## Save on GitHub

1. Añadir todos los archivos
   ```bash
   git add .
   ```

2. Hacer el commit
   ```bash
   git commit -m "comentario"
   ```

3. Subir
   ```bash
   git push
   ```

## Deploy

### Manual deploy

1. Crear el /dist
   El /dist es una carpeta la cual crea pnpm para subir la web

   ```bash
   pnpm build
   ```

2. Subir a AWS S3

   ```bash
   aws s3 sync ./dist s3://$AWS_BUCKET --delete
   ```

3. Sincronizar la "invalidation" en AWS CloudFront

   ```bash
   aws cloudfront create-invalidation --distribution-id $AWS_DISTRIBUTION_ID --paths "/*"
   ```

### Automated deploy
Doing a push on main it deploys automatically with GitHub Actions.

## Important Considerations

- **Accessibility**: Ensure your portfolio is accessible to all users, including those with disabilities.
- **SEO**: Optimize your portfolio for search engines by adding meta tags and relevant content.
- **Performance**: Use modern web development practices to ensure optimal performance, such as lazy loading images and minimizing CSS/JS.
- **Responsive Design**: Make sure your portfolio looks good on devices of all sizes, from mobile to desktop screens.


## License

- This source codes are licensed under the [MIT License](LICENSE).
- The content (`src/content/`) of the portfolio is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
- The images (`public/`) used in the project are for template demonstration purposes only and should not be reused without permission.
