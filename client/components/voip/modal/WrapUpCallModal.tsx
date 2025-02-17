import { Button, ButtonGroup, Field, Modal, TextAreaInput } from '@rocket.chat/fuselage';
import React, { ReactElement, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useCallCloseRoom } from '../../../contexts/CallContext';
import { useSetModal } from '../../../contexts/ModalContext';
import { useTranslation } from '../../../contexts/TranslationContext';
import Tags from '../../Omnichannel/Tags';

type WrapUpCallPayload = {
	comment: string;
	tags?: string[];
};

export const WrapUpCallModal = (): ReactElement => {
	const setModal = useSetModal();
	const closeRoom = useCallCloseRoom();

	const closeModal = (): void => setModal(null);
	const t = useTranslation();

	const { register, handleSubmit, setValue } = useForm<WrapUpCallPayload>();

	useEffect(() => {
		register('tags');
	}, [register]);

	const handleTags = (value: string[]): void => {
		setValue('tags', value);
	};

	const onSubmit: SubmitHandler<WrapUpCallPayload> = (data): void => {
		closeRoom(data);
		closeModal();
	};

	return (
		<Modal is='form' onSubmit={handleSubmit(onSubmit)}>
			<Modal.Header>
				<Modal.Title>{t('Wrap_Up_the_Call')}</Modal.Title>
				<Modal.Close onClick={closeModal} />
			</Modal.Header>
			<Modal.Content>
				<Field mbe='24px'>
					<Field.Label>{t('Notes')}</Field.Label>
					<Field.Row>
						<TextAreaInput {...register('comment')} />
					</Field.Row>
					<Field.Hint>{t('These_notes_will_be_available_in_the_call_summary')}</Field.Hint>
				</Field>
				<Tags handler={handleTags as () => void} />
			</Modal.Content>
			<Modal.Footer>
				<ButtonGroup align='end'>
					<Button ghost onClick={closeModal}>
						{t('Cancel')}
					</Button>
					<Button type='submit' primary>
						{t('Save')}
					</Button>
				</ButtonGroup>
			</Modal.Footer>
		</Modal>
	);
};
