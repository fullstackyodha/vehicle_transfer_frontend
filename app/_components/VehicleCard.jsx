'use client';
import { Box } from '@mui/material';
import React from 'react';

const VehicleCard = ({ key, vehicle }) => {
	return (
		<>
			<Box
				key={key}
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '36%',
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
							fontSize: '1rem',
							fontWeight: 'bold',
						}}
					>
						{vehicle.vehicleNumber}
					</Box>

					<Box
						sx={{
							backgroundColor: '#f54242',
							fontWeight: 'bold',
							fontSize: '0.9rem',
							padding: '0.3rem 0.4rem',
							borderRadius: '10px',
						}}
					>
						{vehicle.vehicleType}
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default VehicleCard;
