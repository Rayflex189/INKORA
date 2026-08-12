"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/activity-logs/route";
exports.ids = ["app/api/admin/activity-logs/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Factivity-logs%2Froute&page=%2Fapi%2Fadmin%2Factivity-logs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Factivity-logs%2Froute.ts&appDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Factivity-logs%2Froute&page=%2Fapi%2Fadmin%2Factivity-logs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Factivity-logs%2Froute.ts&appDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_suobo_gemini_antigravity_ide_scratch_INKORA_src_app_api_admin_activity_logs_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/activity-logs/route.ts */ \"(rsc)/./src/app/api/admin/activity-logs/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"standalone\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/activity-logs/route\",\n        pathname: \"/api/admin/activity-logs\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/activity-logs/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\suobo\\\\.gemini\\\\antigravity-ide\\\\scratch\\\\INKORA\\\\src\\\\app\\\\api\\\\admin\\\\activity-logs\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_suobo_gemini_antigravity_ide_scratch_INKORA_src_app_api_admin_activity_logs_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/activity-logs/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmFjdGl2aXR5LWxvZ3MlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGYWN0aXZpdHktbG9ncyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGYWN0aXZpdHktbG9ncyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNzdW9ibyU1Qy5nZW1pbmklNUNhbnRpZ3Jhdml0eS1pZGUlNUNzY3JhdGNoJTVDSU5LT1JBJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNzdW9ibyU1Qy5nZW1pbmklNUNhbnRpZ3Jhdml0eS1pZGUlNUNzY3JhdGNoJTVDSU5LT1JBJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PXN0YW5kYWxvbmUmcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMEQ7QUFDdkk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmtvcmEvPzk5ZDMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcc3VvYm9cXFxcLmdlbWluaVxcXFxhbnRpZ3Jhdml0eS1pZGVcXFxcc2NyYXRjaFxcXFxJTktPUkFcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYWN0aXZpdHktbG9nc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJzdGFuZGFsb25lXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2FjdGl2aXR5LWxvZ3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi9hY3Rpdml0eS1sb2dzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9hY3Rpdml0eS1sb2dzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcc3VvYm9cXFxcLmdlbWluaVxcXFxhbnRpZ3Jhdml0eS1pZGVcXFxcc2NyYXRjaFxcXFxJTktPUkFcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcYWN0aXZpdHktbG9nc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vYWN0aXZpdHktbG9ncy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Factivity-logs%2Froute&page=%2Fapi%2Fadmin%2Factivity-logs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Factivity-logs%2Froute.ts&appDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/activity-logs/route.ts":
/*!**************************************************!*\
  !*** ./src/app/api/admin/activity-logs/route.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/admin */ \"(rsc)/./src/lib/admin.ts\");\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\nasync function GET() {\n    const auth = await (0,_lib_admin__WEBPACK_IMPORTED_MODULE_1__.requireAdminApi)();\n    if (auth instanceof next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse) return auth;\n    try {\n        const logs = await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.activityLog.findMany({\n            orderBy: {\n                createdAt: \"desc\"\n            },\n            take: 100,\n            include: {\n                user: {\n                    select: {\n                        id: true,\n                        name: true,\n                        username: true,\n                        role: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            logs\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch activity logs\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9hY3Rpdml0eS1sb2dzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDRztBQUNoQjtBQUV2QixlQUFlRztJQUNwQixNQUFNQyxPQUFPLE1BQU1ILDJEQUFlQTtJQUNsQyxJQUFJRyxnQkFBZ0JKLHFEQUFZQSxFQUFFLE9BQU9JO0lBRXpDLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ILHVDQUFFQSxDQUFDSSxXQUFXLENBQUNDLFFBQVEsQ0FBQztZQUN6Q0MsU0FBUztnQkFBRUMsV0FBVztZQUFPO1lBQzdCQyxNQUFNO1lBQ05DLFNBQVM7Z0JBQ1BDLE1BQU07b0JBQUVDLFFBQVE7d0JBQUVDLElBQUk7d0JBQU1DLE1BQU07d0JBQU1DLFVBQVU7d0JBQU1DLE1BQU07b0JBQUs7Z0JBQUU7WUFDdkU7UUFDRjtRQUVBLE9BQU9qQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFYjtRQUFLO0lBQ2xDLEVBQUUsT0FBT2MsT0FBTztRQUNkLE9BQU9uQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQWdDLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3JGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmtvcmEvLi9zcmMvYXBwL2FwaS9hZG1pbi9hY3Rpdml0eS1sb2dzL3JvdXRlLnRzPzA4YTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyByZXF1aXJlQWRtaW5BcGkgfSBmcm9tIFwiQC9saWIvYWRtaW5cIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvbGliL2RiXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQoKSB7XG4gIGNvbnN0IGF1dGggPSBhd2FpdCByZXF1aXJlQWRtaW5BcGkoKTtcbiAgaWYgKGF1dGggaW5zdGFuY2VvZiBOZXh0UmVzcG9uc2UpIHJldHVybiBhdXRoO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgbG9ncyA9IGF3YWl0IGRiLmFjdGl2aXR5TG9nLmZpbmRNYW55KHtcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImRlc2NcIiB9LFxuICAgICAgdGFrZTogMTAwLFxuICAgICAgaW5jbHVkZToge1xuICAgICAgICB1c2VyOiB7IHNlbGVjdDogeyBpZDogdHJ1ZSwgbmFtZTogdHJ1ZSwgdXNlcm5hbWU6IHRydWUsIHJvbGU6IHRydWUgfSB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGxvZ3MgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGFjdGl2aXR5IGxvZ3NcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwicmVxdWlyZUFkbWluQXBpIiwiZGIiLCJHRVQiLCJhdXRoIiwibG9ncyIsImFjdGl2aXR5TG9nIiwiZmluZE1hbnkiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwidGFrZSIsImluY2x1ZGUiLCJ1c2VyIiwic2VsZWN0IiwiaWQiLCJuYW1lIiwidXNlcm5hbWUiLCJyb2xlIiwianNvbiIsImVycm9yIiwic3RhdHVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/activity-logs/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/admin.ts":
/*!**************************!*\
  !*** ./src/lib/admin.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   requireAdminApi: () => (/* binding */ requireAdminApi),\n/* harmony export */   requireAdminServer: () => (/* binding */ requireAdminServer)\n/* harmony export */ });\n/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n\nasync function requireAdminServer() {\n    const user = await (0,_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();\n    if (!user || user.role !== \"ADMIN\" || user.status === \"SUSPENDED\") {\n        return null;\n    }\n    return {\n        user\n    };\n}\nasync function requireAdminApi() {\n    const user = await (0,_auth__WEBPACK_IMPORTED_MODULE_0__.getCurrentUser)();\n    if (!user) {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: \"Authentication required\"\n        }, {\n            status: 401\n        });\n    }\n    // Independent server-side check against database\n    const dbUser = await _db__WEBPACK_IMPORTED_MODULE_1__.db.user.findUnique({\n        where: {\n            id: user.id\n        },\n        select: {\n            id: true,\n            role: true,\n            status: true\n        }\n    });\n    if (!dbUser || dbUser.role !== \"ADMIN\" || dbUser.status === \"SUSPENDED\") {\n        return next_server__WEBPACK_IMPORTED_MODULE_2__.NextResponse.json({\n            error: \"Forbidden: Administrator privileges required\"\n        }, {\n            status: 403\n        });\n    }\n    return {\n        user\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2FkbWluLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXFEO0FBQzNCO0FBQ2lCO0FBRXBDLGVBQWVHO0lBQ3BCLE1BQU1DLE9BQU8sTUFBTUoscURBQWNBO0lBQ2pDLElBQUksQ0FBQ0ksUUFBUUEsS0FBS0MsSUFBSSxLQUFLLFdBQVdELEtBQUtFLE1BQU0sS0FBSyxhQUFhO1FBQ2pFLE9BQU87SUFDVDtJQUNBLE9BQU87UUFBRUY7SUFBSztBQUNoQjtBQUVPLGVBQWVHO0lBQ3BCLE1BQU1ILE9BQU8sTUFBTUoscURBQWNBO0lBQ2pDLElBQUksQ0FBQ0ksTUFBTTtRQUNULE9BQU9GLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUEwQixHQUFHO1lBQUVILFFBQVE7UUFBSTtJQUMvRTtJQUVBLGlEQUFpRDtJQUNqRCxNQUFNSSxTQUFTLE1BQU1ULG1DQUFFQSxDQUFDRyxJQUFJLENBQUNPLFVBQVUsQ0FBQztRQUN0Q0MsT0FBTztZQUFFQyxJQUFJVCxLQUFLUyxFQUFFO1FBQUM7UUFDckJDLFFBQVE7WUFBRUQsSUFBSTtZQUFNUixNQUFNO1lBQU1DLFFBQVE7UUFBSztJQUMvQztJQUVBLElBQUksQ0FBQ0ksVUFBVUEsT0FBT0wsSUFBSSxLQUFLLFdBQVdLLE9BQU9KLE1BQU0sS0FBSyxhQUFhO1FBQ3ZFLE9BQU9KLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUErQyxHQUFHO1lBQUVILFFBQVE7UUFBSTtJQUNwRztJQUVBLE9BQU87UUFBRUY7SUFBSztBQUNoQiIsInNvdXJjZXMiOlsid2VicGFjazovL2lua29yYS8uL3NyYy9saWIvYWRtaW4udHM/MTkyNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRDdXJyZW50VXNlciwgU2Vzc2lvblVzZXIgfSBmcm9tIFwiLi9hdXRoXCI7XG5pbXBvcnQgeyBkYiB9IGZyb20gXCIuL2RiXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pblNlcnZlcigpOiBQcm9taXNlPHsgdXNlcjogU2Vzc2lvblVzZXIgfSB8IG51bGw+IHtcbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG4gIGlmICghdXNlciB8fCB1c2VyLnJvbGUgIT09IFwiQURNSU5cIiB8fCB1c2VyLnN0YXR1cyA9PT0gXCJTVVNQRU5ERURcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7IHVzZXIgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlcXVpcmVBZG1pbkFwaSgpOiBQcm9taXNlPHsgdXNlcjogU2Vzc2lvblVzZXIgfSB8IE5leHRSZXNwb25zZT4ge1xuICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiQXV0aGVudGljYXRpb24gcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAxIH0pO1xuICB9XG5cbiAgLy8gSW5kZXBlbmRlbnQgc2VydmVyLXNpZGUgY2hlY2sgYWdhaW5zdCBkYXRhYmFzZVxuICBjb25zdCBkYlVzZXIgPSBhd2FpdCBkYi51c2VyLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiB1c2VyLmlkIH0sXG4gICAgc2VsZWN0OiB7IGlkOiB0cnVlLCByb2xlOiB0cnVlLCBzdGF0dXM6IHRydWUgfSxcbiAgfSk7XG5cbiAgaWYgKCFkYlVzZXIgfHwgZGJVc2VyLnJvbGUgIT09IFwiQURNSU5cIiB8fCBkYlVzZXIuc3RhdHVzID09PSBcIlNVU1BFTkRFRFwiKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRm9yYmlkZGVuOiBBZG1pbmlzdHJhdG9yIHByaXZpbGVnZXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAzIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgdXNlciB9O1xufVxuIl0sIm5hbWVzIjpbImdldEN1cnJlbnRVc2VyIiwiZGIiLCJOZXh0UmVzcG9uc2UiLCJyZXF1aXJlQWRtaW5TZXJ2ZXIiLCJ1c2VyIiwicm9sZSIsInN0YXR1cyIsInJlcXVpcmVBZG1pbkFwaSIsImpzb24iLCJlcnJvciIsImRiVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic2VsZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/admin.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comparePassword: () => (/* binding */ comparePassword),\n/* harmony export */   getCurrentUser: () => (/* binding */ getCurrentUser),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   signToken: () => (/* binding */ signToken),\n/* harmony export */   verifyToken: () => (/* binding */ verifyToken)\n/* harmony export */ });\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./db */ \"(rsc)/./src/lib/db.ts\");\n\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || \"inkora-secret-key-super-secure-jwt\";\nasync function hashPassword(password) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().hash(password, 10);\n}\nasync function comparePassword(password, hash) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_0___default().compare(password, hash);\n}\nfunction signToken(user) {\n    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign({\n        id: user.id,\n        email: user.email,\n        username: user.username,\n        name: user.name,\n        role: user.role,\n        status: user.status,\n        mustChangePassword: user.mustChangePassword\n    }, JWT_SECRET, {\n        expiresIn: \"7d\"\n    });\n}\nfunction verifyToken(token) {\n    try {\n        return jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, JWT_SECRET);\n    } catch (error) {\n        return null;\n    }\n}\nasync function getCurrentUser() {\n    const cookieStore = (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();\n    const token = cookieStore.get(\"inkora_token\")?.value;\n    if (!token) return null;\n    const decoded = verifyToken(token);\n    if (!decoded) return null;\n    // Verify user exists in DB & isn't suspended\n    const user = await _db__WEBPACK_IMPORTED_MODULE_3__.db.user.findUnique({\n        where: {\n            id: decoded.id\n        },\n        select: {\n            id: true,\n            email: true,\n            username: true,\n            name: true,\n            role: true,\n            status: true,\n            mustChangePassword: true\n        }\n    });\n    if (!user || user.status === \"SUSPENDED\") return null;\n    return user;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBOEI7QUFDQztBQUNRO0FBQ2I7QUFFMUIsTUFBTUksYUFBYUMsUUFBUUMsR0FBRyxDQUFDRixVQUFVLElBQUk7QUFZdEMsZUFBZUcsYUFBYUMsUUFBZ0I7SUFDakQsT0FBT1Isb0RBQVcsQ0FBQ1EsVUFBVTtBQUMvQjtBQUVPLGVBQWVFLGdCQUFnQkYsUUFBZ0IsRUFBRUMsSUFBWTtJQUNsRSxPQUFPVCx1REFBYyxDQUFDUSxVQUFVQztBQUNsQztBQUVPLFNBQVNHLFVBQVVDLElBQWlCO0lBQ3pDLE9BQU9aLHdEQUFRLENBQ2I7UUFDRWMsSUFBSUYsS0FBS0UsRUFBRTtRQUNYQyxPQUFPSCxLQUFLRyxLQUFLO1FBQ2pCQyxVQUFVSixLQUFLSSxRQUFRO1FBQ3ZCQyxNQUFNTCxLQUFLSyxJQUFJO1FBQ2ZDLE1BQU1OLEtBQUtNLElBQUk7UUFDZkMsUUFBUVAsS0FBS08sTUFBTTtRQUNuQkMsb0JBQW9CUixLQUFLUSxrQkFBa0I7SUFDN0MsR0FDQWpCLFlBQ0E7UUFBRWtCLFdBQVc7SUFBSztBQUV0QjtBQUVPLFNBQVNDLFlBQVlDLEtBQWE7SUFDdkMsSUFBSTtRQUNGLE9BQU92QiwwREFBVSxDQUFDdUIsT0FBT3BCO0lBQzNCLEVBQUUsT0FBT3NCLE9BQU87UUFDZCxPQUFPO0lBQ1Q7QUFDRjtBQUVPLGVBQWVDO0lBQ3BCLE1BQU1DLGNBQWMxQixxREFBT0E7SUFDM0IsTUFBTXNCLFFBQVFJLFlBQVlDLEdBQUcsQ0FBQyxpQkFBaUJDO0lBQy9DLElBQUksQ0FBQ04sT0FBTyxPQUFPO0lBRW5CLE1BQU1PLFVBQVVSLFlBQVlDO0lBQzVCLElBQUksQ0FBQ08sU0FBUyxPQUFPO0lBRXJCLDZDQUE2QztJQUM3QyxNQUFNbEIsT0FBTyxNQUFNVixtQ0FBRUEsQ0FBQ1UsSUFBSSxDQUFDbUIsVUFBVSxDQUFDO1FBQ3BDQyxPQUFPO1lBQUVsQixJQUFJZ0IsUUFBUWhCLEVBQUU7UUFBQztRQUN4Qm1CLFFBQVE7WUFDTm5CLElBQUk7WUFDSkMsT0FBTztZQUNQQyxVQUFVO1lBQ1ZDLE1BQU07WUFDTkMsTUFBTTtZQUNOQyxRQUFRO1lBQ1JDLG9CQUFvQjtRQUN0QjtJQUNGO0lBRUEsSUFBSSxDQUFDUixRQUFRQSxLQUFLTyxNQUFNLEtBQUssYUFBYSxPQUFPO0lBRWpELE9BQU9QO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmtvcmEvLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi9kYlwiO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgXCJpbmtvcmEtc2VjcmV0LWtleS1zdXBlci1zZWN1cmUtand0XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlc3Npb25Vc2VyIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGVtYWlsOiBzdHJpbmc7XHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgcm9sZTogc3RyaW5nO1xyXG4gIHN0YXR1cz86IHN0cmluZztcclxuICBtdXN0Q2hhbmdlUGFzc3dvcmQ/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFzaFBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gIHJldHVybiBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29tcGFyZVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIGhhc2g6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gIHJldHVybiBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgaGFzaCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaWduVG9rZW4odXNlcjogU2Vzc2lvblVzZXIpOiBzdHJpbmcge1xyXG4gIHJldHVybiBqd3Quc2lnbihcclxuICAgIHtcclxuICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcclxuICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICAgIHN0YXR1czogdXNlci5zdGF0dXMsXHJcbiAgICAgIG11c3RDaGFuZ2VQYXNzd29yZDogdXNlci5tdXN0Q2hhbmdlUGFzc3dvcmQsXHJcbiAgICB9LFxyXG4gICAgSldUX1NFQ1JFVCxcclxuICAgIHsgZXhwaXJlc0luOiBcIjdkXCIgfVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlUb2tlbih0b2tlbjogc3RyaW5nKTogU2Vzc2lvblVzZXIgfCBudWxsIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGp3dC52ZXJpZnkodG9rZW4sIEpXVF9TRUNSRVQpIGFzIFNlc3Npb25Vc2VyO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50VXNlcigpOiBQcm9taXNlPFNlc3Npb25Vc2VyIHwgbnVsbD4ge1xyXG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gY29va2llcygpO1xyXG4gIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KFwiaW5rb3JhX3Rva2VuXCIpPy52YWx1ZTtcclxuICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGVjb2RlZCA9IHZlcmlmeVRva2VuKHRva2VuKTtcclxuICBpZiAoIWRlY29kZWQpIHJldHVybiBudWxsO1xyXG5cclxuICAvLyBWZXJpZnkgdXNlciBleGlzdHMgaW4gREIgJiBpc24ndCBzdXNwZW5kZWRcclxuICBjb25zdCB1c2VyID0gYXdhaXQgZGIudXNlci5maW5kVW5pcXVlKHtcclxuICAgIHdoZXJlOiB7IGlkOiBkZWNvZGVkLmlkIH0sXHJcbiAgICBzZWxlY3Q6IHtcclxuICAgICAgaWQ6IHRydWUsXHJcbiAgICAgIGVtYWlsOiB0cnVlLFxyXG4gICAgICB1c2VybmFtZTogdHJ1ZSxcclxuICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgcm9sZTogdHJ1ZSxcclxuICAgICAgc3RhdHVzOiB0cnVlLFxyXG4gICAgICBtdXN0Q2hhbmdlUGFzc3dvcmQ6IHRydWUsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXVzZXIgfHwgdXNlci5zdGF0dXMgPT09IFwiU1VTUEVOREVEXCIpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gdXNlcjtcclxufVxyXG5cclxuIl0sIm5hbWVzIjpbImJjcnlwdCIsImp3dCIsImNvb2tpZXMiLCJkYiIsIkpXVF9TRUNSRVQiLCJwcm9jZXNzIiwiZW52IiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJoYXNoIiwiY29tcGFyZVBhc3N3b3JkIiwiY29tcGFyZSIsInNpZ25Ub2tlbiIsInVzZXIiLCJzaWduIiwiaWQiLCJlbWFpbCIsInVzZXJuYW1lIiwibmFtZSIsInJvbGUiLCJzdGF0dXMiLCJtdXN0Q2hhbmdlUGFzc3dvcmQiLCJleHBpcmVzSW4iLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwidmVyaWZ5IiwiZXJyb3IiLCJnZXRDdXJyZW50VXNlciIsImNvb2tpZVN0b3JlIiwiZ2V0IiwidmFsdWUiLCJkZWNvZGVkIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwic2VsZWN0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/db.ts":
/*!***********************!*\
  !*** ./src/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst db = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = db;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLEtBQ1hGLGdCQUFnQkcsTUFBTSxJQUN0QixJQUFJSix3REFBWUEsQ0FBQztJQUNmSyxLQUFLQyxLQUFzQyxHQUFHO1FBQUM7UUFBUztRQUFTO0tBQU8sR0FBRyxDQUFTO0FBQ3RGLEdBQUc7QUFFTCxJQUFJQSxJQUFxQyxFQUFFTCxnQkFBZ0JHLE1BQU0sR0FBR0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pbmtvcmEvLi9zcmMvbGliL2RiLnRzPzllNGYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRiID1cclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XHJcbiAgbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBsb2c6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyBbXCJxdWVyeVwiLCBcImVycm9yXCIsIFwid2FyblwiXSA6IFtcImVycm9yXCJdLFxyXG4gIH0pO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IGRiO1xyXG4iXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsImRiIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Factivity-logs%2Froute&page=%2Fapi%2Fadmin%2Factivity-logs%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Factivity-logs%2Froute.ts&appDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csuobo%5C.gemini%5Cantigravity-ide%5Cscratch%5CINKORA&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=standalone&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();