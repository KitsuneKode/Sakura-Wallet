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
exports.SendSol = SendSol;
var web3_js_1 = require("@solana/web3.js");
var bs58_1 = require("bs58");
function SendSol(net, from, to, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var decode, rpc, connection, secret, sendersKeypair, LAMPORTS_TO_SEND, transaction, sendSolInstruction, blockhash, signature, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    decode = bs58_1.default.decode;
                    if (net == "MainNet") {
                        rpc = "https://solana-devnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB";
                    }
                    else if (net === "DevNet") {
                        rpc = "https://solana-devnet.g.alchemy.com/v2/AnuiwUGPagWQk_nyL9mZNK_cfPlJBkKD";
                    }
                    else if (net === "TestNet") {
                        rpc = "https://api.testnet.solana.com/";
                    }
                    else {
                        throw new Error("Invalid Network");
                    }
                    connection = new web3_js_1.Connection(rpc, "confirmed");
                    secret = decode(from);
                    sendersKeypair = web3_js_1.Keypair.fromSecretKey(secret);
                    LAMPORTS_TO_SEND = amount * web3_js_1.LAMPORTS_PER_SOL;
                    transaction = new web3_js_1.Transaction();
                    sendSolInstruction = web3_js_1.SystemProgram.transfer({
                        fromPubkey: sendersKeypair.publicKey,
                        toPubkey: new web3_js_1.PublicKey(to),
                        lamports: LAMPORTS_TO_SEND,
                    });
                    transaction.add(sendSolInstruction);
                    console.log("\uD83D\uDCB8 Finished! Sent ".concat(amount, " Sol to the address ").concat(to, ". "));
                    return [4 /*yield*/, connection.getLatestBlockhash()];
                case 1:
                    blockhash = (_a.sent()).blockhash;
                    transaction.recentBlockhash = blockhash;
                    transaction.feePayer = sendersKeypair.publicKey;
                    return [4 /*yield*/, transaction.sign(sendersKeypair)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [sendersKeypair], {
                            commitment: "confirmed",
                            preflightCommitment: "processed",
                        })];
                case 4:
                    signature = _a.sent();
                    console.log("Transaction signature is ".concat(signature));
                    return [2 /*return*/, signature];
                case 5:
                    error_1 = _a.sent();
                    console.error("Transaction failed:", error_1);
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    });
}
SendSol("DevNet", "2XwJhYmALHZjHdBdCrTbUb6mv22UHRLWeK5NAFWueNbFw8vjNuGQvWQSPmhmB84gtqVUjJ8LH4JDrKGEe5qN48aw", "8BxrGvFp9A7vRgPzfQdHBJAKEdBTRyYZdZ9vZFQWC6TT", 0.0001);
