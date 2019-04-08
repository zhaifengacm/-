from django.views.generic.base import View
from django.http import HttpResponse, JsonResponse
from goods.models import Goods
from django.core import serializers

import json


class GoodsViewList(View):
    def get(self, request):
        """
        获取报刊列表
        :param: request
        :return:
        """
        json_list = []
        goods = Goods.objects.all()[:10]
        json_data = serializers.serialize("json", goods)
        json_data = json.loads(json_data)
        return JsonResponse(json_data, safe=False)
