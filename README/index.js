"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var fs = require("fs");
function isLowerAlpha(char) {
    return char.toLowerCase() !== char.toUpperCase() && char === char.toLowerCase();
}
function getHTMLPage(url) {
    return __awaiter(this, void 0, void 0, function () {
        var page;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.get(url)];
                case 1:
                    page = _a.sent();
                    return [2 /*return*/, (page.data)];
            }
        });
    });
}
function getFolderNames(url) {
    return __awaiter(this, void 0, void 0, function () {
        var pageHTML, $, names;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getHTMLPage(url)];
                case 1:
                    pageHTML = _a.sent();
                    $ = cheerio_1.default.load(pageHTML);
                    names = [];
                    $('a').each(function (index, element) {
                        var href = $(element).attr('href');
                        if (isLowerAlpha(href[0]))
                            names.push(href);
                    });
                    return [2 /*return*/, (names)];
            }
        });
    });
}
/* ========================================================================== */
var URLS = [];
function script(url, iter) {
    return __awaiter(this, void 0, void 0, function () {
        var folderNames, _i, folderNames_1, folderName, _a, folderNames_2, folderName;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getFolderNames(url)];
                case 1:
                    folderNames = _b.sent();
                    for (_i = 0, folderNames_1 = folderNames; _i < folderNames_1.length; _i++) {
                        folderName = folderNames_1[_i];
                        URLS.push(url + folderName + "README");
                    }
                    if (!(iter < 3)) return [3 /*break*/, 5];
                    _a = 0, folderNames_2 = folderNames;
                    _b.label = 2;
                case 2:
                    if (!(_a < folderNames_2.length)) return [3 /*break*/, 5];
                    folderName = folderNames_2[_a];
                    return [4 /*yield*/, script(url + folderName, iter + 1)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var toWrite;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, script("http://192.168.56.101/.hidden/", 1)];
                case 1:
                    _a.sent();
                    toWrite = URLS.toString().replace(/,/g, '\n');
                    fs.writeFile("urls", toWrite, function (err) {
                        if (err) {
                            console.error('Erreur lors de l\'écriture dans le fichier :', err);
                            return;
                        }
                        console.log('Le contenu a été écrit dans le fichier avec succès.');
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
