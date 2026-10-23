declare module '*.md' {
  const page: {
    title: string;
    version: string;
    html: string;
    headings: { id: string; text: string }[];
  };
  export default page;
}
