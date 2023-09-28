interface TagValues {
  tag: string;
}

const Tag = ({ tag }: TagValues) => {
  const tagsArray = tag.match(/[A-Za-z][^\s]+/g);

  return (
    <div className="flex flex-wrap gap-2 items-center px-2">
      {tagsArray?.map((tag, i) => (
        <div key={i} className="text text-xs tag-border p-1">
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tag;
