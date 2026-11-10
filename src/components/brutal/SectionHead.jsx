export default function SectionHead({ tag, title, accent, copy, index, dark = false }) {
  return (
    <div className="mb-8 md:mb-[50px]">
      <div
        className={`mb-4 flex items-end justify-between gap-4 border-b-2 pb-2 ${
          dark ? 'border-[#D8D5CD]/35' : 'border-[#16130F]/25'
        }`}
      >
        <span
          className={`inline-block rotate-[-2deg] border-2 bg-[#FF4A1C] px-3 py-1.5 text-[12px] tracking-[0.16em] text-[#16130F] ${
            dark ? 'border-[#D8D5CD]' : 'border-[#16130F]'
          }`}
        >
          {tag}
        </span>
        {index && (
          <span className={`b-idx ${dark ? 'b-idx-l' : ''}`} aria-hidden="true">
            {index}
          </span>
        )}
      </div>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-10">
        <h2 className="rotate-[-1deg] text-[30px] leading-[0.95] tracking-[-0.07em] sm:text-[38px] md:text-[54px] xl:text-[78px]">
          {title}
          <br />
          <em
            className={`inline-block max-w-full px-2 not-italic md:px-3 ${
              dark ? 'bg-[#F2C230] text-[#16130F]' : 'bg-[#16130F] text-[#F2C230]'
            }`}
          >
            {accent}
          </em>
        </h2>
        {copy && <p className="b-copy max-w-[340px] text-[13px] leading-[1.6]">{copy}</p>}
      </div>
    </div>
  );
}