'use client';

import { Box, Button } from '@mui/material';
import Link from 'next/link';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import React from 'react';

const AssignList = ({
	vehicle,
	key,
	setVehicleNumber,
	setFrom,
	handleOpenTransfer,
}) => {
	return (
		<>
			<Box
				key={key}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '80%',
					padding: '1rem',
					backgroundColor: '#dcdee0',
					borderRadius: '10px',
				}}
			>
				<Box
					sx={{
						width: '100%',
						padding: '0 2rem',
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							fontWeight: 'bold',
							fontSize: '0.9rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<Box>Vehicle #</Box>
						<Link
							href={`/transfers/${vehicle.vehicleNumber}`}
							sx={{
								textDecoration: 'none',
							}}
						>
							<Box
								sx={{
									fontSize: '0.9rem',
									padding: '0.3rem 0.4rem',
									borderRadius: '10px',
									backgroundColor: '#123459',
									color: 'white',
								}}
							>
								{vehicle.vehicleNumber}
							</Box>
						</Link>
					</Box>
					<Box
						sx={{
							fontWeight: 'bold',
							fontSize: '0.9rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<Box>Vehicle Type</Box>
						<Box
							sx={{
								fontSize: '0.9rem',
								padding: '0.3rem 0.4rem',
								borderRadius: '10px',
								backgroundColor: '#f54242',
							}}
						>
							{vehicle.vehicleType}
						</Box>
					</Box>

					<Box
						sx={{
							fontWeight: 'bold',
							fontSize: '0.9rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<Box>Current Driver</Box>
						<Box
							sx={{
								fontSize: '0.9rem',
								padding: '0.3rem 0.4rem',
								borderRadius: '10px',
								backgroundColor: '#898967',
							}}
						>
							{vehicle.name}
						</Box>
					</Box>

					<Button
						variant='contained'
						size='small'
						color='warning'
						onClick={() => {
							setVehicleNumber(vehicle.vehicleNumber);
							setFrom(vehicle.id);
							handleOpenTransfer();
						}}
					>
						<SyncAltIcon /> Transfer
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default AssignList;
