public with sharing class RecordPhotoSelectorController {

    @AuraEnabled(cacheable=true)
    public static List<Attachment> getAttachments(Id contactId) {
        return [
            SELECT Id, Name, Body 
              FROM Attachment 
             WHERE ParentId = :contactId 
               AND Name LIKE 'RecordPhoto-%'
              WITH USER_MODE
             LIMIT 200
        ];
    }

}
