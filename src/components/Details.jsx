import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import jsonData from '../data.json';
import "./Details.css"


const projects = jsonData.projects;

const Details = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        if (projectId) {
            let project = projects.find(project => project.id == projectId);
            console.log(project)
            setProject(project);
        }
    }, [projectId])

    const projectInfo = [ /* This would be fetched from a store */
        { aspect: "Geographical Location", value: "Southeast of Tucumán province" },
        { aspect: "Total Area (ha)", value: "Approx. 172,000" },
        { aspect: "EFEM Area Percentage", value: "18%" },
        { aspect: "Deforestation Overview (1976-2020)", value: "88,297 ha deforested (51% of the department)" },
        { aspect: "Recent Deforestation Rate (2017-2020)", value: "756 ha (less deforestation due to legislation)" },
        { aspect: "OTBN Category III (Potential for Transformation)", value: "61,837 ha (37%)" },
        { aspect: "Natural Environment Areas (2020)", value: "72,501 ha (42% natural)" },
        { aspect: "Carbon Fixation Potential (Scale 1-9)", value: "Majority of areas with value 8" },
        { aspect: "Main Tree Species", value: "Algarrobo negro, Chañar, Quebracho Blanco, Mistol, Brea" },
        { aspect: "Biomass of Forests (2020)", value: "50 ha under management, 3,300 ha avoided deforestation" },
        { aspect: "Carbon Fixation Capacity", value: "Over 42,000 ha with high carbon fixation capacity" },
        { aspect: "Biodiversity Impact", value: "Not specified in provided text" },
        { aspect: "Social Impact", value: "Community development programs linked to reforestation efforts" },
        { aspect: "Economic Benefits", value: "Potential for sustainable agroforestry and eco-tourism" },
        { aspect: "Funding and Partnerships", value: "Participation of local and international environmental organizations" },
        { aspect: "Environmental Goals", value: "Long-term goals for forest cover restoration and biodiversity enhancement" },
        { aspect: "Project Monitoring and Evaluation", value: "Systems in place to track progress and report on ecological outcomes" },
    ];


    return (
        <div className="details-container">

            <button className="btn btn-link btn-back" onClick={() => navigate(-1)}>
                <i className="back-icon fa-solid fa-arrow-left-long" title="Go back"></i>
            </button>

            <div className="details-project-title">
                <div>
                    {project?.name}
                </div>
            </div>

            <div>
                <div className='details-section-title'>Description</div>
                The Forestal Project is a comprehensive initiative focused on sustainable forestry management and conservation. Through strategic planning, community engagement, and technological innovation, the project aims to preserve and enhance forest ecosystems. Key objectives include promoting biodiversity, mitigating climate change, and supporting local economies. By combining responsible logging practices, reforestation efforts, and education initiatives, the Forestal Project strives to create a harmonious balance between human activities and the preservation of vital forest resources.
            </div>


            <div>
                <div className='details-section-title'>Insights</div>
            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>

                    {projectInfo.map(({ aspect, value }, idx) => (
                        <tr key={`info_${idx}`}>
                            <td>
                                <b>
                                    {aspect}
                                </b>
                            </td>
                            <td>
                                {value}
                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>

            <div>
                <div className='details-section-title'> Sustainable Development Goals</div>

                <img src="assets/sdg/E_SDG_Icons-01.jpg" alt="" />
            </div> 
        </div>
    )
}

export default Details;