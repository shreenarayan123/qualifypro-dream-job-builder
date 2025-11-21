import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            <DialogTitle>Free Analyses Used Up</DialogTitle>
          </div>
          <DialogDescription className="space-y-4">
            <p>
              You've used all 2 free resume analyses.
            </p>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold mb-2">✨ Pro Plan - $19/month</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Unlimited analyses</li>
                <li>• Advanced features</li>
                <li>• Priority support</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
          >
            Maybe Later
          </Button>
          <Button 
            onClick={() => {
              navigate('/#pricing');
              onClose();
            }}
            className="flex-1"
          >
            View Pricing Plans
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
