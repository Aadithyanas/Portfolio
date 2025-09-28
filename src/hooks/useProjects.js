import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { projects as staticProjects } from '../data';

export const useProjects = (refreshTrigger = 0) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check if Firebase is configured
      if (!db) {
        console.log('Firebase not configured, using static data');
        setProjects(staticProjects);
        setLoading(false);
        return;
      }

      // Force Firebase mode for testing
      console.log('Firebase is configured, attempting to fetch from Firestore...');
      
      console.log('Fetching projects from Firebase...');
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const projectsData = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log(`Found ${projectsData.length} projects in Firebase`);
      
      // Combine Firebase projects with static projects
      const combinedProjects = [...projectsData, ...staticProjects];
      console.log(`Combined ${projectsData.length} Firebase projects with ${staticProjects.length} static projects = ${combinedProjects.length} total projects`);
      
      if (combinedProjects.length === 0) {
        console.log('No projects found, using static data only');
        setProjects(staticProjects);
      } else {
        console.log('Using combined projects:', combinedProjects);
        setProjects(combinedProjects);
      }
    } catch (err) {
      console.error('Error fetching projects: ', err);
      console.log('Falling back to static data only');
      setProjects(staticProjects);
      setError(null); // Don't show error if we have static data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects
  };
};
