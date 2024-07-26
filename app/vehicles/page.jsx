'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddModal from '../_components/AddModal';
import VehicleCard from '../_components/VehicleCard';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	height: 380,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	p: 2,
};

export default function Vehicles() {
	const [vehicleNumber, setVehicleNumber] = useState('');
	const [vehicleType, setVehicleType] = useState('');
	const [pucCertificate, setPUCCertificate] = useState('');
	const [insuranceCertificate, setInsuranceCertificate] = useState('');

	const [searchValue, setSearchValue] = useState('');

	let [vehicleList, setVehicleList] = useState([]);

	useEffect(() => {
		const fetchVehicles = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/v1/vehicles/allVehicles',
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				setVehicleList(data.data.vehicles.reverse());
			} catch (error) {
				console.error('Error fetching vehicles:', error);
			}
		};

		fetchVehicles();
	}, [vehicleList]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setVehicleNumber('');
		setVehicleType('');
		setPUCCertificate('');
		setInsuranceCertificate('');
	};

	if (vehicleList.length && searchValue) {
		vehicleList = vehicleList.filter((vehicle) => {
			return (
				vehicle.vehicleNumber
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				vehicle.vehicleType
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			);
		});
	}

	const handleFileChange = (e, setter) => {
		const file = e.target.files[0];

		if (file) {
			setter(file);
		} else {
			alert('Please select a file.');
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const vehicleData = { vehicleNumber, vehicleType };
			console.log(vehicleData);

			const formData = new FormData();
			formData.append('vehicleData', JSON.stringify(vehicleData));
			formData.append('pucCertificate', pucCertificate);
			formData.append('insuranceCertificate', insuranceCertificate);

			console.log(formData);

			const response = await fetch(
				'http://localhost:8000/api/v1/vehicles/create',
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				toast.error('Error Creating Vehicle!!', {
					duration: 4000,
					position: 'top-center',
				});
			} else {
				setVehicleNumber('');
				setVehicleType('');
				setPUCCertificate('');
				setInsuranceCertificate('');

				toast.success('Vehicle Created Successfully.', {
					duration: 4000,
					position: 'top-center',
				});

				handleClose();
			}
		} catch (err) {}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Search & Add */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					gap: '1rem',
				}}
			>
				<TextField
					label='Search Vehicles'
					variant='outlined'
					size='small'
					autoFocus
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					sx={{ width: '20rem' }}
				/>

				{/* MODAL */}
				<AddModal
					style={style}
					label='Vehicle'
					open={open}
					handleClose={handleClose}
				>
					<Box sx={style}>
						<Box
							sx={{ fontSize: '1.2rem' }}
							id='modal-modal-title'
						>
							Add New Vehicle
						</Box>

						<form
							onSubmit={(e) => handleSubmit(e)}
							enctype='multipart/form-data'
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: '1rem',
								}}
							>
								<TextField
									id='fullname'
									label='Number'
									variant='outlined'
									size='small'
									sx={{ width: '100%' }}
									value={vehicleNumber}
									onChange={(e) =>
										setVehicleNumber(e.target.value)
									}
									required
								/>

								<TextField
									id='number'
									label='Type'
									variant='outlined'
									size='small'
									sx={{ width: '100%' }}
									value={vehicleType}
									onChange={(e) =>
										setVehicleType(e.target.value)
									}
									required
								/>

								<label htmlFor='puc'>PUC Certificate</label>

								<TextField
									type='file'
									id='puc'
									variant='outlined'
									size='small'
									sx={{ width: '100%' }}
									onChange={(e) =>
										handleFileChange(e, setPUCCertificate)
									}
									required
								/>

								<label htmlFor='insurance'>
									Insurance Certificate
								</label>

								<TextField
									type='file'
									id='insurance'
									variant='outlined'
									size='small'
									sx={{ width: '100%' }}
									onChange={(e) =>
										handleFileChange(
											e,
											setInsuranceCertificate
										)
									}
									required
								/>

								<Button
									type='submit'
									color='success'
									variant='contained'
								>
									Create
								</Button>
							</Box>
						</form>
					</Box>
				</AddModal>

				<Button
					variant='contained'
					size='small'
					color='success'
					onClick={handleOpen}
				>
					<AddIcon />
					Add Vehicle
				</Button>
			</Box>

			{/* DRIVER LIST */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '1rem',
					marginTop: '1rem',
				}}
			>
				{vehicleList.map((vehicle, index) => {
					return (
						<VehicleCard
							key={index}
							vehicle={vehicle}
						/>
					);
				})}
			</Box>
		</Box>
	);
}
