import Mirrored from './Mirrored';

export default function AynaSection({ id, tag, title, accent, copy, children }) {
  return (
    <section id={id} className="scroll-mt-24 px-5 py-14 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0">
            <span className="ayna-label text-[#C9A15A]">{tag}</span>
            <Mirrored className="mt-4" fade="h-[64px] md:h-[104px]">
              <h2 className="ayna-display text-[44px] sm:text-[60px] md:text-[82px]">
                {title}
                <br />
                <span className="text-[#C9A15A]">{accent}</span>
              </h2>
            </Mirrored>
          </div>
          {copy && (
            <p className="max-w-[330px] text-[13px] leading-[1.7] text-[#F1ECE2]/55 md:text-[14px]">
              {copy}
            </p>
          )}
        </div>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}