import Stats from '@ui/stats';

export default function Info({ code, accreditations, establishmentYear, courses, gallery, facilities }) {
    return (
        <div className="grid md:grid-cols-6 grid-cols-2 md:gap-2 gap-1 mb-2 md:mb-0">
            <Stats
                title="Established Year"
                value={establishmentYear}
            />
            <Stats
                title="College Code"
                value={code}
            />
            <Stats
                title="Accreditations"
                value={accreditations.join(', ')}
                multi={accreditations && accreditations.length > 1}
            />
            <Stats
                title="Courses"
                value={courses}
            />
            <Stats
                title="Facilities"
                value={facilities}
            />
            <Stats
                title="Photos"
                value={gallery}
            />
        </div>
    )
}
