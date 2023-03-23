package community.calculator.service;

import community.calculator.dto.CalculatorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class CalculatorService {

    // 1000W = 1kWh

    /* 계산식  1.  100 <= inputNum  (inputNum == 70)
                BaseFees[0] + (inputNum * UseFees[0])
              2.  300 <= inputNum (inputNum == 220)
                BasFees[2] + {inputNum 중 100 (inputNum의 남은 값은 120) * UseFees[0]}
                + {inputNum 중 100 (inputNum의 남은 값은 20) * UseFees[1]}
                + {inputNum 남은 값 (20) * UseFees[2]}
     */
    /*월간 전기요금 계산*/
    public CalculatorDto.ResponseList calculatorResponse(int powerConsume1, int usageTime1,
                                                         int powerConsume2, int usageTime2,
                                                         int powerConsume3, int usageTime3,
                                                         int powerConsume4, int usageTime4,
                                                         int powerConsume5, int usageTime5) {
        int[] params1 = new int[]{powerConsume1, powerConsume2, powerConsume3, powerConsume4, powerConsume5};
        int[] params2 = new int[]{usageTime1, usageTime2, usageTime3, usageTime4, usageTime5};

        int kWh = 0; // 월간 사용량
        List<CalculatorDto.Response> list = new ArrayList<>(); //사용자의 입력값에 대한 월간사용량 리스트
        
        for (int i = 0; i < params1.length; i++) {  // 사용자의 입력값과 월간 사용량 리스폰스를 생성
            CalculatorDto.Response response = monthUsage(params1[i], params2[i]);
            list.add(response);
            
            kWh = kWh + response.getKWh(); //월간 총 사용량 계산
        }

        double totalUsage = 0; //월간 예상요금

        int[] baseFees = {400, 890, 1560, 3750, 7110, 12600};
        double[] useFees = {59.1, 122.6, 183.0, 273.2, 406.7, 690.8};

        if (kWh <= 0) {
            totalUsage = 0;
        } else if (kWh <= 100) {
            totalUsage = baseFees[0] + (kWh * useFees[0]);
        } else if (kWh <= 200) {
            totalUsage = baseFees[1] + (100 * useFees[0]) + ((kWh - 100) * useFees[1]);
        } else if (kWh <= 300) {
            totalUsage = baseFees[2] + (100 * useFees[0]) + (200 * useFees[1]) + ((kWh - 200) * useFees[2]);
        } else if (kWh <= 400) {
            totalUsage = baseFees[3] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + ((kWh - 300) * useFees[3]);
        } else if (kWh <= 500) {
            totalUsage = baseFees[4] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])
                    + ((kWh - 400) * useFees[4]);
        } else if (kWh > 500) {
            totalUsage = baseFees[5] + (100 * useFees[0]) + (200 * useFees[1]) + (300 * useFees[2]) + (400 * useFees[3])
                    + (500 * useFees[4]) + ((kWh - 500) * useFees[5]);
        }


        /*리스폰스값을 생성*/
        CalculatorDto.ResponseList responseList = new CalculatorDto.ResponseList();
        String strTotalFee = Integer.toString((int) totalUsage).replaceAll("\\B(?=(\\d{3})+(?!\\d))", ",");//천단위 나누기
        responseList.setTotalFee("합계: "+strTotalFee + "원");
        responseList.setKWhList(list);

        return responseList;
    }


    /*월간 사용량 계산, 30일 기준*/
    public CalculatorDto.Response monthUsage(int powerConsumption, int usageTime) {
        int kWh = (powerConsumption * (usageTime * 30)) / 1000;

        CalculatorDto.Response response = new CalculatorDto.Response();
        response.setPowerConsume(powerConsumption);
        response.setUsageTime(usageTime);
        response.setKWh(kWh);

        return response;
    }
}
