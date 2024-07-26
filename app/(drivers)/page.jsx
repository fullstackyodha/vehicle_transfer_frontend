'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { DriverCard } from '@/app/_components/DriverCard';
import AddModal from '../_components/AddModal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	height: 250,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	p: 2,
};

export default function Drivers() {
	const [name, setFullname] = useState('');
	const [phoneNumber, setPhone] = useState('');
	const [profilePhoto, setProfilePhoto] = useState('');

	const [selectedFile, setSelectedFile] = useState(null);

	const [searchValue, setSearchValue] = useState('');

	let [driverList, setDriverList] = useState([]);

	useEffect(() => {
		const fetchDrivers = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/v1/drivers/allDrivers',
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				setDriverList(data.data.drivers.reverse() || []);
			} catch (error) {
				console.error('Error fetching drivers:', error);
			}
		};

		fetchDrivers();
	}, [driverList]);

	if (driverList.length && searchValue) {
		driverList = driverList.filter((driver) => {
			return (
				driver.name.toLowerCase().includes(searchValue.toLowerCase()) ||
				driver.phoneNumber
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			);
		});
	}

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setFullname('');
		setPhone('');
		setProfilePhoto('');
		setSelectedFile(null);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
			setSelectedFile(file);
		} else {
			alert('Please select a PNG or JPEG image file.');
		}
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const driverData = { name, phoneNumber };
			console.log(driverData);

			const formData = new FormData();
			formData.append('profilePhoto', selectedFile);
			formData.append('driverData', JSON.stringify(driverData));

			console.log(formData);

			const response = await fetch(
				'http://localhost:8000/api/v1/drivers/create',
				{
					method: 'POST',
					body: formData,
				}
			);

			if (!response.ok) {
				toast.error('Error Creating Driver!!', {
					duration: 4000,
					position: 'top-center',
				});
			} else {
				setFullname('');
				setPhone('');
				setProfilePhoto('');

				toast.success('Driver Created Successfully.', {
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
					label='Search Drivers'
					variant='outlined'
					size='small'
					autoFocus
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					sx={{ width: '20rem' }}
				/>

				<AddModal
					style={style}
					label={'Driver'}
					open={open}
					handleOpen={handleOpen}
					handleClose={handleClose}
				>
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
								label='Full Name'
								variant='outlined'
								size='small'
								sx={{ width: '100%' }}
								value={name}
								onChange={(e) => setFullname(e.target.value)}
								required
							/>

							<TextField
								id='number'
								type='number'
								label='Phone'
								variant='outlined'
								size='small'
								sx={{ width: '100%' }}
								value={phoneNumber}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>

							<TextField
								type='file'
								id='photo'
								variant='outlined'
								size='small'
								sx={{ width: '100%' }}
								onChange={(e) => handleFileChange(e)}
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
				</AddModal>

				<Button
					variant='contained'
					size='medium'
					color='success'
					onClick={handleOpen}
					type='submit'
				>
					<AddIcon />
					Add Driver
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
				{driverList.map((driver, index) => (
					<DriverCard
						key={index}
						driver={driver}
					/>
				))}
			</Box>
		</Box>
	);
}
