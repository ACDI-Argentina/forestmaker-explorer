import { useEffect, useRef, useState } from "react";
import "./projects-map.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import jsonData from '../data.json'; // Import the JSON file
import Navbar from "./Navbar";

mapboxgl.accessToken = 'pk.eyJ1IjoiamR1dHR3ZWlsZXIiLCJhIjoiY2xtaG9hYjVpMGphcTNsbnNnNW9mOHJkdyJ9.OVLT-bOXFJHxHb39qn1SMw';

const ProjectsMap = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(1);
  const selectedProjectRef = useRef(null);

  const [projects, setProjects] = useState(jsonData.projects);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      //style: 'mapbox://styles/mapbox/satellite-streets-v12',

      center: [lng, lat],
      zoom: zoom
    });

    const scrollToProject = () => {
      if (selectedProjectRef.current) {
        // Scroll to the selected project element
        selectedProjectRef.current.scrollIntoView({ behavior: 'smooth' });
        
      }
    };

    const markerClicked = project => {
      setSelectedProjectId(project.id);
      const element = document.querySelector(
        `.project-card[data-id="${project.id}"]`
      );
      selectedProjectRef.current = element;
      scrollToProject();
    }

    projects.forEach(project => {
      const marker = new mapboxgl.Marker()
        .setLngLat([project.coordinates.longitude, project.coordinates.latitude]) // Example marker coordinates (longitude, latitude)
        .addTo(map.current);

      marker.getElement().addEventListener('click', () => {
        markerClicked(project);
      });
    })

    // Example marker 1
  }, [])



  const navigateTo = (project) => {
    console.log("Navigate or show the project in the map", project)
    const { latitude, longitude } = project.coordinates;
    //Focus the map there
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 8
    })

  }

  return (
    <>
    <Navbar />
      <div className="app-wrapper">
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
                onClick={() => navigateTo(project)}>
                <div className="project-title">
                  {project.name}
                </div>
                <div className="project-body">
                  <img src={`https://picsum.photos/seed/${idx + 1}/200/175`} alt="" />
                  <div>
                    <div className="project-location">
                      {project.country}
                    </div>
                    <div className="project-location">
                      {project.type}
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

        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}

export default ProjectsMap;