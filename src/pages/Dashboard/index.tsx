import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';

import { Container, Content } from './styles';
import Employees from './Subpages/Employees';
import Connections from './Subpages/Connections';
import Projects from './Subpages/Projects';

const Dashboard: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('employees')

  const handleChangePage = useCallback((page: string) => {
    setSelectedPage(page)
    return
  }, [])

  return (
    <Container>
      <Header selectedPage={selectedPage} handleChangePage={handleChangePage}/>
      <Content>
        {selectedPage === 'employees' && <Employees/>}
        {selectedPage === 'connections' && <Connections/>}
        {selectedPage === 'projects' && <Projects/>}
      </Content>
    </Container>
  )
}

export default Dashboard;