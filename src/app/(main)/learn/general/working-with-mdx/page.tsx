type Props = {
  params: { level: string; topic: string };
};

// TODO: Fetch and display actual content for this topic from USACO Guide
// This is a placeholder for the "Working With MDX" page under the General section.

export async function generateMetadata({ params }: Props) {
  return {
    title: `Working With MDX - General - USACO Prep`,
  };
}

export default function WorkingWithMDXPage({ params }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Working With MDX (General)</h1>
      <p className="mb-4">
        This page will contain the content from the USACO Guide section on "Working With MDX".
        The content will be fetched and integrated here.
      </p>
      <div className="prose dark:prose-invert max-w-none">
        {/* Content from USACO Guide will be rendered here */}
        <p>USACO Guide Link: <a href="https://usaco.guide/general/working-with-mdx" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://usaco.guide/general/working-with-mdx</a></p>
        <p><i>Content integration in progress...</i></p>
      </div>
    </div>
  );
}

