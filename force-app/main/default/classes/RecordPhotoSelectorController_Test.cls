@IsTest
private class RecordPhotoSelectorController_Test {

    @TestSetup
    static void makeData() {
        Contact contact = TestDataFactory.createContacts(1)[0];
        insert contact;

        Attachment attach = new Attachment();
        attach.Name = 'RecordPhoto-' + String.valueOf(contact.Id) + '.jpg';
        attach.body = Blob.valueOf('Some file content');
        attach.parentId = contact.Id;
        insert attach;
    }
    

    @IsTest
    static void getAttachments() {
        Contact contact = [SELECT Id FROM Contact LIMIT 1];
        List<Attachment> attachments = RecordPhotoSelectorController.getAttachments(contact.Id);
        System.assertEquals(1, attachments.size());
    }

}