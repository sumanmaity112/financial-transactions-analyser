# Financial Transactions Analyser

---

Use charts to analyse CSV financial transactions, such as bank transactions.
This uses browser history to communicate data between pages, but it doesn't exchange any information with third parties.

## CSV Format

The following format of CSV data is needed for this application:

- `Transaction Date`
  - required: `true`
  - format: `dd-MM-yyyy`
- `Description`
  - required: `true`
- `Credit`
  - required: `false`
  - default: `''`
- `Debit`
  - required: `false`
  - default: `''`
- `Chq / Ref No`
  - required: `false`

### Sample Data

```
Transaction Date,Description,Credit,Debit,Chq / Ref No
21-08-2023,NEFT:Salary,"23,237.00","",NEFT-1234
21-08-2023,NEFT:Rent,"","3,724.33",NEFT-0986
22-08-2023,MB:Commission,245.00,"",KPG-0181
23-08-2023,NEFT:FD Interest,"12,480.00","",PP-0403
25-08-2023,RTGS:Loan,"","11,561.00",RTGSINW-00610
28-08-2023,MB:Miscellaneous,"88,736.00","",KK-979
28-08-2023,Cheque,"","15,427.37",CHQ-871
28-08-2023,MB:Miscellaneous,253.50,"",NEFT-123486
29-08-2023,MB:Purchase Stocks,"","108,245.11",NEFT-120834
```
