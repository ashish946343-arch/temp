export default function ChangeMask({ maskImage, changeType }) {
  return (
    <div className="border border-hairline bg-surface">
      <div className="border-b border-hairline px-3 py-2.5">
        <h2 className="text-[11px] font-medium tracking-wide text-ink-dim uppercase">
          Change Mask
        </h2>
      </div>
      <div className="p-3">
        <img
          src={maskImage}
          alt="Change mask"
          className="aspect-[4/3] w-full border border-hairline object-cover"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[10px] text-ink-faint">Detected Change:</span>
          <span className="border border-status-med/40 bg-status-med/10 px-2 py-0.5 text-[11px] font-medium text-status-med">
            {changeType}
          </span>
        </div>
      </div>
    </div>
  );
}
