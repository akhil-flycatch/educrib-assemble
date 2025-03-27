
export default function Tab({ label, icon, onClick, active = false }: {
    label: string,
    icon?: React.ReactNode,
    onClick: any,
    active: boolean
}) {
    const activeClass = active ? 'py-2 text-red ' : 'text-dark  opacity-90';
    return (
        <div className="flex flex-col">
            <div onClick={onClick} className={`${activeClass} flex items-center space-x-2 cursor-pointer font-semibold hover:text-red hover:opacity-100`}>
                {icon}
                <span>{label}</span>
            </div>
            {active && <div className="w-full h-1 bg-gradient-to-r from-lavender to-red rounded-lg" />}
        </div>
    )
}
