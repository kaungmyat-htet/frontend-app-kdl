// import { getConfig } from '@edx/frontend-platform';
import {
  Container, Row, Col, Alert, DataTable, Button,
} from '@edx/paragon';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TableActions from '@edx/paragon/src/DataTable/TableActions';
import { fetchCareerPaths } from './data/thunks';
import selectCareerPaths from './data/selectors';

// const buildLmsUrl = (absoluteUrl) => `${getConfig().LMS_BASE_URL}${absoluteUrl}`;

export const CareerPathPageBase = () => {
  const TableAction = ({ tableInstance }) => (
    <Button onClick={() => console.log('Table Action', tableInstance)}>Create Path</Button>
  );
  const dispatch = useDispatch();
  const {
    careerpaths,
    errors,
    fetching,
  } = useSelector(selectCareerPaths);
  useEffect(() => {
    dispatch(fetchCareerPaths());
  }, [dispatch]);
  return (
    <Container>
      {/* <h1>This is the message of Career Path.</h1> */}
      <Col xs={12}>
        {errors.map((error) => <Alert variant="danger" key={error}>{error}</Alert>)}
      </Col>
      {(fetching && (
        <Row>
          <Col>Loading....</Col>
        </Row>
      )) || (
        <Row className="mx-4 my-3">
          <DataTable
            data={careerpaths}
            columns={[
              {
                Header: 'ID',
                accessor: 'id',
              },
              {
                Header: 'Name',
                accessor: 'name',
              },
            ]}
            itemCount={10}
            tableActions={[
              <TableAction />,
            ]}
            additionalColumns={[
              {
                id: 'action',
                Header: 'Action',
                Cell: ({ row }) => (
                  <Row>
                    <Button variant="link" size="sm"
                            onClick={() => console.log(`Editing ${row.values.id}`)}>Edit</Button>
                    <Button variant="link" size="sm"
                            onClick={() => console.log(`Deleting ${row.values.id}`)}>Delete</Button>
                  </Row>

                ),
              },
            ]}
          >
            <DataTable.Table/>
          </DataTable>
        </Row>
      )}
    </Container>
  );
};

export const CareerPathPage = CareerPathPageBase;
