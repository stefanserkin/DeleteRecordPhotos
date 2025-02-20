import { LightningElement, api, wire, track } from 'lwc';
import getAttachments from '@salesforce/apex/RecordPhotoSelectorController.getAttachments';

export default class RecordPhotoSelector extends LightningElement {
    @api recordId; // Contact Id from Flow
    @api selectedIds = [];
    @track attachments = [];

    @wire(getAttachments, { contactId: '$recordId' })
    wiredAttachments({ error, data }) {
        if (data) {
            this.attachments = data.map(att => ({
                id: att.Id,
                name: att.Name,
                dataUrl: `https://asphaltgreen--uat.sandbox.lightning.force.com/servlet/servlet.FileDownload?file=${att.Id}`
            }));
            console.log(JSON.stringify(this.attachments));
        } else if (error) {
            console.error('Error fetching attachments', error);
        }
    }

    handleSelection(event) {
        const attachmentId = event.target.dataset.id;
        console.log('attachmentId --> ' + attachmentId);
        if (event.target.checked) {
            this.selectedIds = [...this.selectedIds, attachmentId];
        } else {
            this.selectedIds = this.selectedIds.filter(id => id !== attachmentId);
        }
        console.log('selectedIds --> ' + JSON.stringify(this.selectedIds));
    }

}
