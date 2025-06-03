type Props = {
  params: { level: string; topic: string };
};

export default function TopicPage({ params }: Props) {
  return (
    <div>
      <h1>Topic: {decodeURIComponent(params.topic)}</h1>
      <p>Level: {decodeURIComponent(params.level)}</p>
      <p>Content for this topic (theory, examples, videos, exercises) will be here.</p>
    </div>
  );
}

