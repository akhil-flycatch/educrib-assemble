export default function Container({ title, children, padding = true }: {
    title?: string,
    children: React.ReactNode,
    padding?: boolean
}) {
    const paddingClass = padding ? 'md:p-6 p-3' : 'p-0';
    return (
        <div className="border border-light shadow-md rounded-sm md:mb-3 mb-1">
            {title && <div className="bg-gradient-to-r from-lavender to-red text-light p-2 font-semibold rounded-t-md whitespace-nowrap overflow-ellipsis overflow-hidden">{title}</div>}
            <div className={paddingClass}>{children}</div>
        </div>
    )
}
