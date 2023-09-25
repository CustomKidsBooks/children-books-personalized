interface TagValues {
  tag: string;
}

const Tag = ({ tag }: TagValues) => {
  const tagsArray = tag.match(/#[^\s]+/g)?.map((t) => t.slice(1));

  return (
    <div className="flex gap-2 items-center px-2">
      {tagsArray?.map((tag, i) => (
        <div key={i} className="text text-xs tag-border p-1">
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tag;
