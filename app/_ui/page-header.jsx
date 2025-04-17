export default function PageHeader({ title, subTitle }) {
    return (
      <div className="mb-4 flex flex-col items-center text-center">
        <h1 className="text-primary font-bold text-3xl">{title}</h1>
        {subTitle && <h2 className="italic text-sm mt-1">{subTitle}</h2>}
      </div>
    );
  }
  