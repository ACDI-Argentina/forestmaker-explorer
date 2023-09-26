import { useEffect, useRef, useState } from "react";
import "./projects-map.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import jsonData from '../data.json'; // Import the JSON file
import Navbar from "./Navbar";
import ReactCountryFlag from "react-country-flag";

mapboxgl.accessToken = 'pk.eyJ1IjoiamR1dHR3ZWlsZXIiLCJhIjoiY2xtaG9hYjVpMGphcTNsbnNnNW9mOHJkdyJ9.OVLT-bOXFJHxHb39qn1SMw';

const ProjectsMap = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(1);
  const [zoom, setZoom] = useState(window.innerWidth < 600 ? 0 : 1); //I want this depends of size screen
  const selectedProjectRef = useRef(null);

  const [projects, setProjects] = useState(jsonData.projects);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      //style: 'mapbox://styles/mapbox/satellite-streets-v12',

      center: [lng, lat],
      zoom: zoom //thats 
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
      const customMarker = document.createElement('img');
      customMarker.className = "custom-marker";
      customMarker.src = "/logo.png";
      customMarker.alt = "marker";


      const marker = new mapboxgl.Marker({ element: customMarker })
        .setLngLat([project.coordinates.longitude, project.coordinates.latitude])
        .addTo(map.current);

      marker.getElement().addEventListener('click', () => {
        markerClicked(project);
      });
    })
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
                    <div className="row">
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

        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}

export default ProjectsMap;