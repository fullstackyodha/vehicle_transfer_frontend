import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';

export const AddModal = ({ style, label, open, handleClose, children }) => {
	return (
		<div>
			<div>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby={`modal-modal-${label}`}
				>
					<Box sx={style}>
						<Box
							sx={{ fontSize: '1.2rem' }}
							id={`modal-modal-${label}`}
						>
							Add New {label}
						</Box>
						{children}
					</Box>
				</Modal>
			</div>
		</div>
	);
};

export default AddModal;
