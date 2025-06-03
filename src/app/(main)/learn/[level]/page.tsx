type Props = {
  params: { level: string };
};

export default function LevelPage({ params }: Props) {
  return (
    <div>
      <h1>Learning Path: {decodeURIComponent(params.level)}</h1>
      <p>List of topics for this level will be here.</p>
      {/* Links to specific topics will be here */}
    </div>
  );
}

