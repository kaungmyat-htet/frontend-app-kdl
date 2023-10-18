import {
  Container, Row,
} from '@edx/paragon';
import PersonalInfoSection from '../components/PersonalInfoSection';
import ProjectSection from '../components/ProjectSection';

const ProfilePage = () => (
  <Container className="my-2 px-5">
    <Row>
      <h2>My Portfolio Profile</h2>
    </Row>
    <div className="my-3">
      <h3>Career Info</h3>
      <div>
        <PersonalInfoSection />
      </div>
    </div>
    <div>
      <h3>Projects</h3>
      <div>
        <ProjectSection />
      </div>
    </div>
  </Container>
);

export default ProfilePage;
