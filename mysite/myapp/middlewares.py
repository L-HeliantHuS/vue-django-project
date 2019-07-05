from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

class CheckGetValue(MiddlewareMixin):
    def process_request(self, request):
        pass
        # aa = request.GET.get("aa") if request.GET.get("aa") else 0
        # kk = request.GET.get("kk") if request.GET.get("kk") else 0
        # if ~(aa == 0 or kk == 0) and (int(aa) + int(kk) != 66):
        #     return JsonResponse({
        #         "status_code": 2,
        #         "error": "calc error!"
        #     })

    def process_response(self, request, response):
        return response