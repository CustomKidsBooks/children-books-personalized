interface TagValues {
  tag: string[];
}

const Tag = ({ tag }: TagValues) => {
  return (
    <div className="flex gap-2 items-center px-2">
      {tag.map((t, i) => (
        <div key={i} className="text text-xs tag-border p-1">
          {t}
        </div>
      ))}
    </div>
  );
};

export default Tag;
