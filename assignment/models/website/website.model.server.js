/**
 * Created by Joe on 10/06/2017.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);
var userModel = require('../user/user.model.server');

//api
websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.addPage = addPage;
websiteModel.deletePage = deletePage;

module.exports = websiteModel;

function deletePage(pageId) {
    return websiteModel
        .find({pages:pageId})
        .then(function (websites) {
            var website = websites[0];
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        });
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

//deleteWebsiteFromUser
function deleteWebsite(websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel
                .deleteWebsite(websiteId);
        });
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    return websiteModel
        .create(website)
        .then(function (website) {
            return userModel
                .addWebsite(userId, website._id)
        })
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}
