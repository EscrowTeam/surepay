import { BankEvent } from "@/types/bank"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatEther } from "viem"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"

const Events = ({ events }: { events: BankEvent[] }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Historique des transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {events.map((event, index) => {
            const isDeposit = event.type === 'Deposit'
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 rounded-full p-2 ${isDeposit ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}
                  >
                    {isDeposit ? <ArrowDownCircle className="h-5 w-5" /> : <ArrowUpCircle className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.account}
                    </p>
                    <p className="text-xs text-muted-foreground">Block #{event.blockNumber}</p>
                  </div>
                </div>

                <p className={`text-sm font-semibold ${isDeposit ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isDeposit ? '+' : '-'}{formatEther(event.amount)} ETH
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default Events
