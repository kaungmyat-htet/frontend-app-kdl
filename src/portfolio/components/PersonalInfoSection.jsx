import { useState, useEffect } from 'react';

import {
  Form, Button, Chip, Alert,
} from '@edx/paragon';
import { Close, CheckCircle } from '@edx/paragon/icons';

import { getUserInfo, createUserInfo, updateUserInfo } from '../data/api';

const PersonalInfoSection = () => {
  const [isNew, setIsNew] = useState(true);
  const [userSkills, setUserSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    profession: '',
    highest_level_degree: '',
    institution: '',
    skills: [],
  });

  async function getCareerInfo() {
    try {
      const response = await getUserInfo();
      console.log(response);
      setIsNew(response.isNew === 'true');
      setUserSkills(response.skills);
      setProfileInfo({
        profession: response.profession,
        highest_level_degree: response.highest_level_degree,
        institution: response.institution,
        skills: response.skills,
      });
      // console.log(profileInfo);
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInfo = {
      profession: profileInfo.profession,
      highest_level_degree: profileInfo.highest_level_degree,
      institution: profileInfo.institution,
      skills: userSkills,
    };
    console.log(userInfo);
    if (isNew) {
      try {
        const resp = await createUserInfo(userInfo);
        console.log(resp);
        setTitle('Success');
        setMessage(resp.detail);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        console.log(profileInfo);
        const resp = await updateUserInfo(userInfo);
        console.log(resp);
        setTitle('Success');
        setMessage(resp.detail);
      } catch (e) {
        console.log(e);
      }
    }
    setIsEditing(false);
    setShowAlert(true);
    await getCareerInfo();
  };

  const addSkills = () => {
    console.log(profileInfo);
    setUserSkills([
      ...userSkills,
      skillInput,
    ]);
    setSkillInput('');
  };

  const removeSkill = (item) => {
    console.log(item);
    setUserSkills(
      userSkills.filter(skill => skill !== item)
    );
  };

  const handleChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleEditButton = () => {
    setIsEditing(!isEditing);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleFormChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setProfileInfo((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getCareerInfo();
  }, []);
  return (
    <div>
      <Alert
        variant="success"
        show={showAlert}
        icon={CheckCircle}
        // dismissible
        actions={[
          <Button variant="tertiary" onClick={handleCloseAlert}>Dismiss</Button>,
        ]}
      >
        <Alert.Heading>{title}</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Profession</Form.Label>
          <Form.Control disabled={!isEditing} name="profession" value={profileInfo.profession}
                        onChange={handleFormChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Highest Level Degree</Form.Label>
          <Form.Control
            disabled={!isEditing}
            name="highest_level_degree"
            value={profileInfo.highest_level_degree}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Institution</Form.Label>
          <Form.Control disabled={!isEditing} name="institution" value={profileInfo.institution}
                        onChange={handleFormChange}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Skills</Form.Label>
          {
            isEditing && (
              <Form.Row>
                <Form.Control name="skill" value={skillInput} onChange={handleChange} />
                <Button variant="primary" onClick={addSkills}>Add</Button>
              </Form.Row>
            )
          }
          <div>
            {(isEditing && (
              <div>
                {userSkills.map((skill) => (
                  <Chip
                    iconAfter={Close}
                    onIconAfterClick={() => removeSkill(skill)}
                    key={skill}
                  >{skill}
                  </Chip>
                ))}
              </div>
            )) || (
              <div>
                {(userSkills.length > 0 && (
                  <div>
                    { userSkills.map((skill) => (
                      <Chip key={skill}>{skill}</Chip>
                    ))}
                  </div>
                )) || (
                  <div>None</div>
                )}
              </div>
            )}
          </div>
        </Form.Group>
        <div>
          {
            (isEditing && (
              <div className="d-flex">
                <Button variant="success" type="submit" className="mr-4">
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )) || (
              <Button onClick={handleEditButton}>
                Edit
              </Button>
            )
          }
        </div>
      </Form>
    </div>
  );
};

export default PersonalInfoSection;
