'use client';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from 'next/link';
import AssignList from '../_components/AssignList';

const style = {
	position: 'absolute',
	top: '40%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	height: 240,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	p: 2,
};

export default function Transfers() {
	let [assignedList, setAssignedList] = useState([]);

	let [vehicleList, setVehicleList] = useState([]);

	let [driverList, setDriverList] = useState([]);

	const [vehicle, setVehicle] = useState('');

	const [driver, setDriver] = useState('');

	const [vehicleNumber, setVehicleNumber] = useState('');

	const [from, setFrom] = useState('');

	const [to, setTo] = useState('');

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const fetchAssigned = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/v1/assign/getAllAssignedVehicle',
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				setAssignedList(data.data.allAssignedVehicle);
			} catch (error) {
				console.error('Error fetching Assigned Vehicles:', error);
			}
		};

		const fetchAllVehicles = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/v1/vehicles/allVehicles',
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				let assignedVehicleList = assignedList?.map(
					(vehicle) => vehicle.vehicleNumber
				);

				let vehicles = data.data.vehicles?.filter(
					(vehicle) =>
						!assignedVehicleList.includes(vehicle.vehicleNumber)
				);

				setVehicleList(vehicles);
			} catch (error) {
				console.error('Error fetching Vehicles:', error);
			}
		};

		const fetchAllDrivers = async () => {
			try {
				const response = await fetch(
					'http://localhost:8000/api/v1/drivers/allDrivers',
					{
						method: 'GET',
					}
				);

				const data = await response.json();

				setDriverList(data.data.drivers);
			} catch (error) {
				console.error('Error fetching Drivers:', error);
			}
		};

		fetchAllDrivers();
		fetchAllVehicles();
		fetchAssigned();
	}, [assignedList, vehicleList, driverList]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [openTransfer, setOpenTransfer] = useState(false);
	const handleOpenTransfer = () => setOpenTransfer(true);
	const handleCloseTransfer = () => setOpenTransfer(false);

	if (assignedList.length && searchValue) {
		assignedList = assignedList.filter((list) => {
			return (
				list.vehicleNumber
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				list.vehicleType
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				list.name.toLowerCase().includes(searchValue.toLowerCase())
			);
		});
	}

	const handleAssignVehicle = async (e) => {
		try {
			e.preventDefault();

			const response = await fetch(
				'http://localhost:8000/api/v1/assign/driver',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						driverId: driver,
						vehicleNumber: vehicle,
					}),
				}
			);

			if (!response.ok) {
				toast.error('Error Assigning!!', {
					duration: 4000,
					position: 'top-center',
				});
			} else {
				setVehicle('');
				setDriver('');

				toast.success('Assigned Successfully.', {
					duration: 4000,
					position: 'top-center',
				});

				handleClose();
			}
		} catch (err) {
			toast.error('Error Assigning!!', {
				duration: 4000,
				position: 'top-center',
			});
		}
	};

	const handleTransferVehicle = async (e) => {
		try {
			e.preventDefault();

			const response = await fetch(
				'http://localhost:8000/api/v1/transfer/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						fromDriverId: from,
						toDriverId: to,
						vehicleNumber: vehicleNumber,
					}),
				}
			);

			if (!response.ok) {
				toast.error('Error Transfering!!', {
					duration: 4000,
					position: 'top-center',
				});
			} else {
				setVehicleNumber('');
				setFrom('');
				setTo('');

				toast.success('Transfered Successfully.', {
					duration: 4000,
					position: 'top-center',
				});

				handleCloseTransfer();
			}
		} catch (err) {
			toast.error('Error Transfering!!', {
				duration: 4000,
				position: 'top-center',
			});
		}
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
					label='Search Vehicle or Driver'
					variant='outlined'
					size='small'
					autoFocus
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					sx={{ width: '20rem' }}
				/>

				{/* ASSIGN MODAL */}
				<div>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='modal-modal-title'
					>
						<Box sx={style}>
							<Box
								sx={{ fontSize: '1.2rem' }}
								id='modal-modal-title'
							>
								Assign Vehicle
							</Box>

							<form>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										gap: '1rem',
									}}
								>
									<Box
										sx={{
											minWidth: 120,
										}}
									>
										<FormControl fullWidth>
											<InputLabel
												id='driver'
												size='small'
											>
												Select Driver
											</InputLabel>
											<Select
												size='small'
												labelId='driver'
												id='driver'
												value={driver}
												label='Select Driver'
												onChange={(e) => {
													setDriver(e.target.value);
												}}
											>
												{driverList.map(
													(driver, index) => (
														<MenuItem
															key={index}
															value={driver.id}
														>
															{driver.name}
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
									</Box>

									<Box sx={{ textAlign: 'center' }}>TO</Box>

									<Box sx={{ minWidth: 120 }}>
										<FormControl fullWidth>
											<InputLabel
												id='vehicle'
												size='small'
											>
												Select Vehicle
											</InputLabel>
											<Select
												size='small'
												labelId='vehicle'
												id='vehicle'
												value={vehicle}
												label='Select Vehicle'
												onChange={(e) => {
													setVehicle(e.target.value);
												}}
												required
											>
												{vehicleList.map(
													(vehicle, index) => (
														<MenuItem
															key={index}
															value={
																vehicle.vehicleNumber
															}
														>
															{
																vehicle.vehicleNumber
															}
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
									</Box>

									<Button
										sx={{ marginTop: '1rem' }}
										onClick={handleAssignVehicle}
										color='success'
										variant='contained'
									>
										Assign
									</Button>
								</Box>
							</form>
						</Box>
					</Modal>
				</div>

				<Button
					variant='contained'
					size='small'
					color='success'
					onClick={handleOpen}
				>
					<AddIcon /> Assign
				</Button>
			</Box>

			{/* TRANSFER MODAL */}
			<div>
				<Modal
					open={openTransfer}
					onClose={handleCloseTransfer}
					aria-labelledby='modal-modal-transfer'
				>
					<Box sx={style}>
						<Box
							sx={{ fontSize: '1.2rem' }}
							id='modal-modal-transfer'
						>
							Transfer Vehicle
						</Box>

						<form>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: '1rem',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<Box
										sx={{
											fontSize: '0.9rem',
											fontWeight: 'bold',
											padding: '0.3rem 0.4rem',
											borderRadius: '10px',
											backgroundColor: '#123459',
											color: 'white',
										}}
									>
										{vehicleNumber}
									</Box>
								</Box>

								<Box
									sx={{
										textAlign: 'center',
										fontSize: '1.2rem',
										fontWeight: 'bold',
									}}
								>
									To
								</Box>

								<Box
									sx={{
										minWidth: 120,
									}}
								>
									<FormControl fullWidth>
										<InputLabel
											id='transfer'
											size='small'
										>
											Select Driver
										</InputLabel>
										<Select
											size='small'
											labelId='transfer'
											id='transfer'
											value={to}
											label='Select Driver'
											onChange={(e) => {
												setTo(e.target.value);
											}}
										>
											{driverList.map((driver, index) => (
												<MenuItem
													key={index}
													value={driver.id}
												>
													{driver.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>

								<Button
									sx={{ marginTop: '1rem' }}
									onClick={handleTransferVehicle}
									color='success'
									variant='contained'
								>
									Transfer
								</Button>
							</Box>
						</form>
					</Box>
				</Modal>
			</div>

			{assignedList.length > 0 && (
				<Box
					sx={{
						textAlign: 'center',
						marginTop: '1rem',
						fontWeight: 'bold',
						fontSize: '1.1rem',
					}}
				>
					Recently Assigned/Transfered List
				</Box>
			)}

			{/* ASSIGNED LIST */}
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
				{assignedList.map((vehicle, index) => {
					return (
						<AssignList
							key={index}
							vehicle={vehicle}
							setVehicleNumber={setVehicleNumber}
							setFrom={setFrom}
							handleOpenTransfer={handleOpenTransfer}
						/>
					);
				})}
			</Box>
		</Box>
	);
}
