import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  FirstLine,
  Content,
  Projects,
  Project,
  NoProjectsMessage,
  EmployeesContainer,
  EmployeesListHeader,
  EmployeeItem,
  EmployeeProfile,
  EmployeeIncoming,
  EmployeeStatus,
  Buttons,
} from './styles';
import api from '../../../../services/api';
import editIcon from '../../../../assets/edit.svg';
import trashIcon from '../../../../assets/trash.svg';
import avatarImg from '../../../../assets/Avatar.svg';
import formatValue from '../../../../utils/formatValue';
import { formatRelative, subHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AddEmployee from '../../../../components/AddEmployee';

interface IProject {
  id: string;
  image_url: string;
  title: string;
  description: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  skill: string;
  avatar_url: string;
}

interface Employee {
  id: string;
  payment: number;
  status: string;
  created_at: string;
  user: User;
}

const Employees: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedProject, setSelectedProject] = useState<IProject>({} as IProject)
  const [addEmployee, setAddEmployee] = useState(false);

  const handleAddEmployee = useCallback(() => {
    setAddEmployee(state => !state)
  }, [])

  useEffect(() => {
    async function getData() {
      const response = await api.get('/projects')
      setProjects(response.data)
      setSelectedProject(response.data[0])
    }

    getData()

  }, [])
  
  const handleSubmitAddEmployee = useCallback(async() => {
    const response = await api.get(`/employees/${selectedProject.id}`)
      setEmployees(response.data)
  }, [selectedProject])

  useEffect(() => {
    async function getData() {
      const response = await api.get(`/employees/${selectedProject.id}`)
      setEmployees(response.data)
    }

    if(selectedProject) {
      getData()
    }
  }, [selectedProject])

  const handleDeleteEmployee = useCallback(async (id: string) => {
    const filteredEmployees = employees.filter(employee => employee.id !== id)
    setEmployees(filteredEmployees)

    await api.delete(`/employees/${id}`)
  }, [employees])

  return (
    <Container>
      <FirstLine>
        <h4>Integrantes</h4>
        <button onClick={handleAddEmployee}>+integrante</button>
        <AddEmployee handleSubmit={handleSubmitAddEmployee} project_id={selectedProject.id} setIsOpen={handleAddEmployee} isOpen={addEmployee}/>
      </FirstLine>
      {projects.length === 0 && <NoProjectsMessage>Você não tem nenhum projeto</NoProjectsMessage>}
      {projects.length > 0 && (
        <Content>
          <Projects>
          {projects.map(project => (
            <Project onClick={() => setSelectedProject(project)} key={project.id} selected={project.id === selectedProject.id}>
              <img src={project.image_url} alt={project.title}/>
              <p>{project.title}</p>
            </Project>
          ))}
          </Projects>
          {employees.length > 0 && (
            <EmployeesContainer>
              <EmployeesListHeader>
                <strong>Nome</strong>
                <strong>Salário</strong>
                <strong>Status</strong>
              </EmployeesListHeader>
              {employees.map(employee => (
                <EmployeeItem>
                  <EmployeeProfile>
                    <img src={employee.user.avatar_url || avatarImg} alt={employee.user.name} />
                    <div>
                      <strong>{employee.user.name}</strong>
                      <span>{employee.user.skill}</span>
                    </div>
                  </EmployeeProfile>
                  <EmployeeIncoming>
                    <strong>{formatValue(employee.payment)}</strong>
                  </EmployeeIncoming>
                  <EmployeeStatus>
                    <strong>{employee.status}</strong>
                    <span>
                      {formatRelative(subHours(new Date(employee.created_at), 3), Date.now(), {
                        locale: ptBR
                      })}
                  </span>
                  </EmployeeStatus>

                  <Buttons>
                    <button onClick={() => handleDeleteEmployee(employee.id)} title="Remover">
                      <img src={trashIcon} alt="Delete" />
                    </button>
                  </Buttons>
                </EmployeeItem>
              ))}
            </EmployeesContainer>
          )}
        </Content>
      )}
    </Container>
  )
}

export default Employees;