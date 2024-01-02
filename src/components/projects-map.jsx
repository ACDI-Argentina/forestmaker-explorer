import { useEffect, useRef, useState } from "react";
import "./projects-map.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import jsonData from '../data.json'; // Import the JSON file
import Navbar from "./Navbar";
import ReactCountryFlag from "react-country-flag";
import { Route, Routes, useNavigate } from "react-router-dom";
import Details from "./Details";
import Home from "./Home";
import ProjectList from "./projects/ProjectList";

mapboxgl.accessToken = 'pk.eyJ1IjoiamR1dHR3ZWlsZXIiLCJhIjoiY2xtaG9hYjVpMGphcTNsbnNnNW9mOHJkdyJ9.OVLT-bOXFJHxHb39qn1SMw';

const ProjectsMap = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(1);
  const [zoom, setZoom] = useState(window.innerWidth < 600 ? 0 : 1); //I want this depends of size screen
  const selectedProjectRef = useRef(null);
  const navigate = useNavigate();

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

    /* How we can pass the project id? */
    navigate(`/details/${project.id}`);


  }

  return (
    <>
      <Navbar />

      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={
          <ProjectList
            projects={projects}
            selectedProjectId={selectedProjectId}
            onProjectSelected={(project) => navigateTo(project)}
          />
          } index={true} />
          <Route path="/details/:projectId" element={<Details />} />
        </Routes>








        <div ref={mapContainer} className="map-container" />
      </div>
    </>
  );
}

export default ProjectsMap;