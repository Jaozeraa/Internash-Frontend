import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  FirstLine,
  Content,
  ProjectsContainer,
  Project,
  NoProjectsMessage,
  ProjectContainer
} from './styles';
import api from '../../../../services/api';
import editIcon from '../../../../assets/edit.svg';
import trashIcon from '../../../../assets/trash.svg';

interface IProject {
  id: string;
  image_url: string;
  title: string;
  description: string;
}


const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject>({} as IProject)

  useEffect(() => {
    async function getData() {
      const response = await api.get('/projects')
      setProjects(response.data)
      setSelectedProject(response.data[0])
    }

    getData()

  }, [])

  return (
    <Container>
      <FirstLine>
        <h4>Projetos</h4>
        <button onClick={() => {}}>+projeto</button>
      </FirstLine>
      {projects.length === 0 && <NoProjectsMessage>Você não tem nenhum projeto</NoProjectsMessage>}
      {projects.length > 0 && (
        <Content>
          <ProjectsContainer>
          {projects.map(project => (
            <Project onClick={() => setSelectedProject(project)} key={project.id} selected={project.id === selectedProject.id}>
              <img src={project.image_url} alt={project.title}/>
              <p>{project.title}</p>
            </Project>
          ))}
          </ProjectsContainer>
          <ProjectContainer>
            <img src={selectedProject.image_url} alt={selectedProject.title}/>
            <h5>{selectedProject.title}</h5>
            <p>{selectedProject.description}</p>
          </ProjectContainer>
        </Content>
      )}
    </Container>
  )
}

export default Projects;