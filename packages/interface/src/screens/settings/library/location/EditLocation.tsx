import { useLibraryQuery } from '@sd/client';
import { Button, RadioGroup, forms, tw } from '@sd/ui';
import { Archive, ArrowsClockwise, Trash, TrashSimple } from 'phosphor-react';
import { Controller } from 'react-hook-form';
import { useParams } from 'react-router';
import { Divider } from '~/components/explorer/inspector/Divider';
import { Folder } from '~/components/icons/Folder';
import { SettingsSubPage } from '~/components/settings/SettingsSubPage';

import { Form, Input, Switch, useZodForm, z } from '@sd/ui/src/forms';

const InfoText = tw.p`mt-2 text-xs text-ink-faint`;
const Label = tw.label`mb-1 text-sm font-medium`;
const FlexCol = tw.label`flex flex-col flex-1`;
const ToggleSection = tw.label`flex flex-row w-full`;

export type EditLocationParams = {
	id: string;
};

const schema = z.object({
	displayName: z.string(),
	localPath: z.string(),
	locationType: z.string(),
	generatePreviewMedia: z.boolean(),
	syncPreviewMedia: z.boolean(),
	showInSidebar: z.boolean()
});

export default function EditLocation() {
	const { id } = useParams<keyof EditLocationParams>() as EditLocationParams;

	const form = useZodForm({
		schema,
		defaultValues: {
			generatePreviewMedia: true,
			syncPreviewMedia: true,
			showInSidebar: false
		}
	});

	const isDirty = form.formState.isDirty;

	useLibraryQuery(['locations.getById', Number(id)], {
		onSuccess: (data) => {
			if (data && !isDirty)
				form.reset({
					displayName: data.name || undefined,
					localPath: data.local_path || undefined
					// locationType: data.location_type,
					// generatePreviewMedia: data.generate_preview_media,
					// syncPreviewMedia: data.sync_preview_media,
					// showInSidebar: data.show_in_sidebar
				});
		}
	});

	const handleSubmit = form.handleSubmit(async (data) => {});

	return (
		<Form form={form} onSubmit={handleSubmit}>
			<SettingsSubPage
				title="Edit Location"
				topRight={
					<Button disabled={!isDirty} variant={isDirty ? 'accent' : 'outline'} size="sm">
						Save Changes
					</Button>
				}
			>
				{/* <div className="flex flex-col max-w-xl">
				<Folder size={90} />
			</div> */}
				<div className="flex space-x-4">
					<FlexCol>
						<Label>Display Name</Label>
						<Input {...form.register('displayName')} />
						<InfoText>
							The name of this Location, this is what will be displayed in the sidebar. Will not
							rename the actual folder on disk.
						</InfoText>
					</FlexCol>
					<FlexCol>
						<Label>Local Path</Label>
						<Input {...form.register('localPath')} />
						<InfoText>
							The path to this Location, this is where the files will be stored on disk.
						</InfoText>
					</FlexCol>
				</div>
				<Divider />

				<div className="space-y-2">
					<ToggleSection>
						<Label className="flex-grow">Generate preview media for this Location</Label>
						<Switch {...form.register('generatePreviewMedia')} size="sm" />
					</ToggleSection>
					<ToggleSection>
						<Label className="flex-grow">
							Sync preview media for this Location with your devices
						</Label>
						<Switch {...form.register('syncPreviewMedia')} size="sm" />
					</ToggleSection>
					<ToggleSection>
						<Label className="flex-grow">Show Location in sidebar</Label>
						<Switch {...form.register('showInSidebar')} size="sm" />
					</ToggleSection>
				</div>

				<Divider />
				<div className="flex space-x-5">
					<FlexCol>
						<div>
							<Button size="sm" variant="outline">
								<ArrowsClockwise className="inline w-4 h-4 mr-1.5 -mt-0.5" />
								Full Reindex
							</Button>
						</div>
						<InfoText>Perform a full rescan of this Location.</InfoText>
					</FlexCol>
					<FlexCol>
						<div>
							<Button size="sm" variant="outline" className="">
								<Archive className="inline w-4 h-4 mr-1.5 -mt-0.5" />
								Archive
							</Button>
						</div>
						<InfoText>
							Extract data from Library as an archive, useful to preserve Location folder structure.
						</InfoText>
					</FlexCol>
					<FlexCol>
						<div>
							<Button size="sm" variant="colored" className="bg-red-500 border-red-500 ">
								<Trash className="inline w-4 h-4 mr-1.5 -mt-0.5" />
								Delete
							</Button>
						</div>
						<InfoText>
							This will not delete the actual folder on disk. Preview media will be
						</InfoText>
					</FlexCol>
				</div>

				<Divider />
			</SettingsSubPage>
		</Form>
	);
}
