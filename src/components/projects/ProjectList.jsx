import React from 'react'

const ProjectList = ({ projects, selectedProjectId, onProjectSelected }) => {
    return (
        <div className="project-details">
            <div className="project-list"> {/* TODO: move a component */}
                <div className="section-title">
                    All projects&nbsp;
                    <span className="projects-count">{projects.length}</span>
                </div>

                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        data-id={project.id}
                        className={`project-card ${selectedProjectId === project.id ? 'flash' : ''}`}
                        onClick={(e) => onProjectSelected(project)}>
                        <div className="project-body">
                            <div className="img-wrapper">
                                <img src={`https://picsum.photos/seed/${idx + 1}/200/175`} alt="" className="img-rounded" />
                            </div>
                            <div className="project-info">
                                <div className="project-title">
                                    {project.name}
                                </div>
                                <div className="project-developer">
                                    {project.developer}
                                </div>
                                <div className="project-description-wrapper">
                                    <div className="project-description">
                                        {project.description}
                                    </div>
                                </div>

                                <div className="expanded"></div>
                                <div className="rrow">
                                    <div className="project-country">
                                        {/* <ReactCountryFlag countryCode="AR" /> &nbsp; */}
                                        {project.country}
                                    </div>
                                    <div className="project-type">
                                        {project.type}
                                    </div>
                                </div>
                                {/*       <div className="project-location">
              {JSON.stringify(project.coordinates)}
            </div> */}
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default ProjectList