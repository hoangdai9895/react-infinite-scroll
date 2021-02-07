import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { InfinitiScroll } from "./InfinitiScroll";

const GalleryModal = () => {
	const [open, setOpen] = useState(false);

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			dimmer="blurring"
			trigger={<Button>Show Modal</Button>}>
			<Modal.Header>Uploaded Photo</Modal.Header>
			<Modal.Content>
				<InfinitiScroll />
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => setOpen(false)}>
					Close
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default GalleryModal;
