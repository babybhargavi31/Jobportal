import React, { useEffect } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { jobLoadAction } from '../../redux/actions/jobAction';

const DashJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(jobLoadAction());
  }, [dispatch]);

  const { jobs, loading } = useSelector((state) => state.loadJobs);
  const data = Array.isArray(jobs) ? jobs : [];

  const deleteJobById = (e, id) => {
    console.log('Delete Job ID:', id);
    // Add delete logic here if needed
  };

  const columns = [
    {
      field: '_id',
      headerName: 'Job ID',
      width: 150,
    },
    {
      field: 'title',
      headerName: 'Job Name',
      width: 150,
    },
    {
      field: 'jobType',
      headerName: 'Category',
      width: 150,
      valueGetter: (data) => {
        if (!data || !data.row || !data.row.jobType) return 'N/A';
        return data.row.jobType.jobTypeName;
        }
    },
    {
      field: 'user',
      headerName: 'User',
      width: 150,
        valueGetter: (data) => {
        if (!data || !data.row || !data.row.user) return 'N/A';
        return data.row.user.firstName;
        }
    },
    {
      field: 'available',
      headerName: 'Available',
      width: 150,
      renderCell: (values) => (values.row.available ? 'Yes' : 'No'),
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 150,
      renderCell: (values) => `$${values.row.salary}`,
    },
    {
      field: 'Actions',
      width: 200,
      renderCell: (values) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained">
            <Link
              style={{ color: 'white', textDecoration: 'none' }}
              to={`/admin/edit/job/${values.row._id}`}
            >
              Edit
            </Link>
          </Button>
          <Button
            onClick={(e) => deleteJobById(e, values.row._id)}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ color: 'white', pb: 3 }}>
        Jobs List
      </Typography>

      <Box sx={{ pb: 2, display: 'flex', justifyContent: 'right' }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/admin/job/create"
          >
            Create Job
          </Link>
        </Button>
      </Box>

      <Paper sx={{ bgcolor: 'secondary.midNightBlue' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            sx={{
              '& .MuiTablePagination-displayedRows': {
                color: 'white',
              },
              color: 'white',
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.secondary.main,
              },
              button: {
                color: '#ffffff',
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default DashJobs;
