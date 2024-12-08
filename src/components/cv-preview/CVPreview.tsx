import { useCVStore } from '@/lib/store/cv-store'
import { getTemplate } from '@/lib/templates'
import { cn } from '@/lib/utils'

export function CVPreview() {
    const { personalInfo, education, experience, skills, projects, theme } = useCVStore()

    const template = getTemplate(theme.template)
    const styles = template.styles

    return (
        <div
            id="cv-preview"
            className={cn('shadow-lg rounded-lg', styles.container)}
            style={{
                '--font-sans': theme.font,
                '--primary': theme.primary,
                lineHeight: theme.spacing,
            } as React.CSSProperties}
        >
            {/* Header Section */}
            <header className={styles.header}>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                    {personalInfo.title || 'Professional Title'}
                </p>
                <div className="text-sm text-gray-600 space-x-2">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && (
                        <>
                            <span>•</span>
                            <span>{personalInfo.phone}</span>
                        </>
                    )}
                    {personalInfo.location && (
                        <>
                            <span>•</span>
                            <span>{personalInfo.location}</span>
                        </>
                    )}
                </div>
                {personalInfo.links?.length > 0 && (
                    <div className="mt-2 text-sm text-primary space-x-3">
                        {personalInfo.links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </header>

            {/* Summary Section */}
            {personalInfo.summary && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Summary</h2>
                    <div className={styles.content}>
                        <p className="text-gray-700 whitespace-pre-line">
                            {personalInfo.summary}
                        </p>
                    </div>
                </section>
            )}
            {/* Education Section */}
            {education.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    <div className={styles.content}>
                        {education.map((edu) => (
                            <div key={edu.id} className="mb-4">
                                <div className={styles.timeline}>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {edu.school}
                                        </h3>
                                        <p className="text-gray-700">
                                            {edu.degree} in {edu.field}
                                        </p>
                                    </div>
                                    <div className="text-right text-gray-600 text-sm">
                                        <p>{edu.location}</p>
                                        <p>
                                            {edu.startDate} - {edu.endDate || 'Present'}
                                        </p>
                                    </div>
                                </div>
                                {edu.description && (
                                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}


            {/* Experience Section */}
            {experience.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Work Experience</h2>
                    <div className={styles.content}>
                        {experience.map((exp) => (
                            <div key={exp.id} className="mb-4">
                                <div className={styles.timeline}>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {exp.position}
                                        </h3>
                                        <p className="text-gray-700">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-gray-600 text-sm">
                                        <p>{exp.location}</p>
                                        <p>
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                                        {exp.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    <div className={styles.content}>
                        {projects.map((project) => (
                            <div key={project.id} className="mb-4">
                                <div className={styles.timeline}>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">
                                            {project.name}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-2 text-sm text-primary hover:underline"
                                                >
                                                    View Project
                                                </a>
                                            )}
                                        </h3>
                                        {project.technologies.length > 0 && (
                                            <div className={styles.tags}>
                                                {project.technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {project.description && (
                                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                                        {project.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}


            {/* Skills Section */}
            {skills.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    <div className={styles.content}>
                        {Object.entries(
                            skills.reduce((acc, skill) => {
                                const group = skill.group || 'Other'
                                if (!acc[group]) {
                                    acc[group] = []
                                }
                                acc[group].push(skill)
                                return acc
                            }, {} as Record<string, typeof skills>)
                        ).map(([group, groupSkills]) => (
                            <div key={group} className="mb-4">
                                <h3 className="font-medium text-gray-900 mb-2">{group}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {groupSkills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
} 